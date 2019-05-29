package com.huyduc.manage.web.rest;

import com.huyduc.manage.bean.User;
import com.huyduc.manage.repository.UserRepository;
import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.UserService;
import com.huyduc.manage.service.dto.UserDTO;
import com.huyduc.manage.web.rest.errors.BadRequestAlertException;
import com.huyduc.manage.web.rest.errors.EmailAlreadyUsedException;
import com.huyduc.manage.web.rest.errors.LoginAlreadyUsedException;
import com.huyduc.manage.web.rest.vm.RegisterUserAccountVM;
import com.huyduc.manage.web.rest.vm.UpdateUserAccountVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the User entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserResource(UserService userService, UserRepository userRepository) {

        this.userService = userService;
        this.userRepository = userRepository;
    }

    /**
     * POST  /users  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     *
     * @param registerUserAccountVM the user to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user, or with status 400 (Bad Request) if the login or email is already in use
     * @throws URISyntaxException       if the Location URI syntax is incorrect
     * @throws BadRequestAlertException 400 (Bad Request) if the login or email is already in use
     */
    @PostMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<User> createUser(@Valid @RequestBody RegisterUserAccountVM registerUserAccountVM) throws URISyntaxException {
        try {
            User user = userService.createUser(registerUserAccountVM, registerUserAccountVM.getPassword(), registerUserAccountVM.getRe_password());
            return new ResponseEntity(user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(Collections.singletonMap("createFailed",
                    e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * PUT /users : Updates an existing User.
     *
     * @param updateUserAccountVM the user to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated user
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already in use
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already in use
     */
    @PutMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UpdateUserAccountVM updateUserAccountVM) {
        try {
            Optional<UserDTO> updatedUser = userService.updateUser(updateUserAccountVM, updateUserAccountVM.getPassword(), updateUserAccountVM.getRe_password());
            return ResponseEntity.ok().body(updatedUser.get());
        } catch (Exception e) {
            return new ResponseEntity(Collections.singletonMap("updateFailed",
                    e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * GET /users : get all users.
     *
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        final Page<UserDTO> page = userService.getAllManagedUsers(PageRequest.of(0, 10000000, Sort.by("id").descending()));
        return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
    }

    /**
     * @return a string list of the all of the roles
     */
    @GetMapping("/users/authorities")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    /**
     * GET /users/:id : get the id user.
     *
     * @param id the id of the user to find
     * @return the ResponseEntity with status 200 (OK) and with body the id user, or with status 404 (Not Found)
     */
    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.getUserWithAuthorities(id).map(UserDTO::new).get());
    }

    /**
     * DELETE /users/:login : delete the "login" User.
     *
     * @param ids the list id of the user to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<AtomicInteger> deleteUser(@RequestBody List<Long> ids) {
        AtomicInteger count = userService.deleteUser(ids);
        if (count.get() <= 0)
            return ResponseEntity.badRequest().body(count);
        return ResponseEntity.ok().body(count);
    }
}
