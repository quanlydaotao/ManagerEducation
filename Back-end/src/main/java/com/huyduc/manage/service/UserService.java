package com.huyduc.manage.service;

import com.huyduc.manage.config.Constants;
import com.huyduc.manage.bean.Authority;
import com.huyduc.manage.bean.User;
import com.huyduc.manage.repository.AuthorityRepository;
import com.huyduc.manage.repository.UserRepository;
import com.huyduc.manage.security.SecurityUtils;
import com.huyduc.manage.service.dto.UserDTO;
import com.huyduc.manage.service.util.RandomUtil;
import com.huyduc.manage.web.rest.errors.*;
import com.huyduc.manage.web.rest.vm.ManagedUserVM;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
    }

    public Optional<User> activateRegistration(String key) {
        log.debug("Activating user for activation key {}", key);
        return userRepository.findOneByActivationKey(key)
            .map(user -> {
                // activate given user for the registration key.
                user.setActivated(true);
                user.setActivationKey(null);
                log.debug("Activated user: {}", user);
                return user;
            });
    }

    public Optional<User> completePasswordReset(String newPassword, String key) {
        log.debug("Reset user password for reset key {}", key);
        return userRepository.findOneByResetKey(key)
            .map(user -> {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setResetKey(null);
                return user;
            });
    }

    public Optional<User> requestPasswordReset(String mail) {
        return userRepository.findOneByEmailIgnoreCase(mail)
            .filter(User::getActivated)
            .map(user -> {
                user.setResetKey(RandomUtil.generateResetKey());
                return user;
            });
    }

//    public User registerUser(UserDTO userDTO, String password) {
//        userRepository.findOneByLogin(userDTO.getLogin().toUpperCase()).ifPresent(existingUser -> {
//            boolean removed = removeNonActivatedUser(existingUser);
//            if (!removed) {
//                throw new LoginAlreadyUsedException();
//            }
//        });
//        userRepository.findOneByPhoneNumber(userDTO.getPhoneNumber()).ifPresent(existingUser -> {
//            boolean removed = removeNonActivatedUser(existingUser);
//            if (!removed) {
//                throw new PhoneNumberAlreadyUsedException();
//            }
//        });
//        User newUser = new User();
//        String encryptedPassword = passwordEncoder.encode(password);
//        newUser.setLogin(userDTO.getLogin());
//        // new user gets initially a generated password
//        newUser.setPassword(encryptedPassword);
//        newUser.setFirstName(userDTO.getFirstName());
//        newUser.setLastName(userDTO.getLastName());
//        newUser.setEmail(userDTO.getEmail().toLowerCase());
//        newUser.setImageUrl(hashFileName(userDTO.getImageUrl()));
//        newUser.setLangKey(userDTO.getLangKey());
//        newUser.setPhoneNumber(userDTO.getPhoneNumber());
//        newUser.setAddress(userDTO.getAddress());
//        newUser.setAddress1(userDTO.getAddress1());
//        newUser.setNations(userDTO.getNations());
//        newUser.setSex(userDTO.getSex());
//        newUser.setIdentityCardNumber(userDTO.getIdentityCardNumber());
//        newUser.setActivated(userDTO.isActivated());
//        newUser.setBirthday(userDTO.getBirthday());
//        // new user gets registration key
//        newUser.setActivationKey(RandomUtil.generateActivationKey());
//        Set<Authority> authorities = new HashSet<>();
//        userDTO.getAuthorities().forEach((item)->{
//            authorityRepository.findById(item).ifPresent(authorities::add);
//        });
//        newUser.setAuthorities(authorities);
//        userRepository.save(newUser);
//        log.debug("Created Information for User: {}", newUser);
//        return newUser;
//    }

    public User createUser(UserDTO userDTO, String password, String rePassword) {
        userRepository.findOneByLogin(userDTO.getLogin().toUpperCase()).ifPresent(existingUser -> {
            boolean removed = removeNonActivatedUser(existingUser);
            if (!removed) {
                throw new LoginAlreadyUsedException();
            }
        });
        userRepository.findOneByPhoneNumber(userDTO.getPhoneNumber()).ifPresent(existingUser -> {
            boolean removed = removeNonActivatedUser(existingUser);
            if (!removed) {
                throw new PhoneNumberAlreadyUsedException();
            }
        });
        if (!checkPasswordLength(password)) {
            throw new InvalidPasswordException();
        }
        if (!isIdenticalPassword(password, rePassword)) {
            throw new PasswordNotMatchException();
        }
        User newUser = new User();
        newUser.setLogin(userDTO.getLogin());
        // new user gets initially a generated password
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encryptedPassword);;
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setEmail(userDTO.getEmail().toLowerCase());
        newUser.setImageUrl(hashFileName(userDTO.getImageUrl()));
        if (userDTO.getLangKey() == null) {
            newUser.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        } else {
            newUser.setLangKey(userDTO.getLangKey());
        }
        newUser.setPhoneNumber(userDTO.getPhoneNumber());
        newUser.setAddress(userDTO.getAddress());
        newUser.setAddress1(userDTO.getAddress1());
        newUser.setNations(userDTO.getNations());
        newUser.setSex(userDTO.getSex());
        newUser.setIdentityCardNumber(userDTO.getIdentityCardNumber());
        newUser.setActivated(userDTO.isActivated());
        newUser.setResetKey(RandomUtil.generateResetKey());
        newUser.setBirthday(userDTO.getBirthday());
        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        Set<Authority> authorities = new HashSet<>();
        userDTO.getAuthorities().forEach((item)->{
            authorityRepository.findById(item).ifPresent(authorities::add);
        });
        newUser.setAuthorities(authorities);
        userRepository.save(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    /**
     * Update basic information (first name, last name, email, language) for the current user.
     *
     * @param firstName first name of user
     * @param lastName last name of user
     * @param email email id of user
     * @param langKey language key
     * @param imageUrl image URL of user
     */
    public void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl, String address, String phone_number, String identity_card_number) {
        SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(user -> {
                user.setFirstName(firstName);
                user.setLastName(lastName);
                user.setEmail(email.toLowerCase());
                user.setLangKey(langKey);
                user.setImageUrl(imageUrl);
                user.setAddress(address);
                user.setPhoneNumber(phone_number);
                user.setIdentityCardNumber(identity_card_number);
                log.debug("Changed Information for User: {}", user);
            });
    }

    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update
     * @return updated user
     */
    public Optional<UserDTO> updateUser(UserDTO userDTO, String password, String rePassword) {
        Optional<User> existingUser = userRepository.findOneByLogin(userDTO.getLogin());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        existingUser = userRepository.findOneByPhoneNumber(userDTO.getPhoneNumber());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new PhoneNumberAlreadyUsedException();
        }
        return Optional.of(userRepository
            .findById(userDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(user -> {
                user.setLogin(userDTO.getLogin().toLowerCase());
                if (!password.isEmpty() && !rePassword.isEmpty()) {
                    if (!checkPasswordLength(password)) {
                        throw new InvalidPasswordException();
                    }
                    if (!isIdenticalPassword(password, rePassword)) {
                        throw new PasswordNotMatchException();
                    }
                    String encryptedPassword = passwordEncoder.encode(password);
                    user.setPassword(encryptedPassword);
                }
                user.setFirstName(userDTO.getFirstName());
                user.setLastName(userDTO.getLastName());
                user.setEmail(userDTO.getEmail().toLowerCase());
                if (!userDTO.getImageUrl().isEmpty() && !(userDTO.getImageUrl().equals(user.getImageUrl()))) {
                    user.setImageUrl(hashFileName(userDTO.getImageUrl()));
                }
                user.setAddress(userDTO.getAddress());
                user.setPhoneNumber(userDTO.getPhoneNumber());
                user.setAddress1(userDTO.getAddress1());
                user.setNations(userDTO.getNations());
                user.setSex(userDTO.getSex());
                user.setIdentityCardNumber(userDTO.getIdentityCardNumber());
                user.setActivated(userDTO.isActivated());
                user.setBirthday(userDTO.getBirthday());
                Set<Authority> managedAuthorities = user.getAuthorities();
                managedAuthorities.clear();
                userDTO.getAuthorities().stream()
                    .map(authorityRepository::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .forEach(managedAuthorities::add);
                log.debug("Changed Information for User: {}", user);
                return user;
            })
            .map(UserDTO::new);
    }

    public void deleteUser(String login) {
        userRepository.findOneByLogin(login).ifPresent(user -> {
            userRepository.delete(user);
            log.debug("Deleted User: {}", user);
        });
    }

    public void changePassword(String currentClearTextPassword, String newPassword) {
        SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(user -> {
                String currentEncryptedPassword = user.getPassword();
                if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                    throw new InvalidPasswordException();
                }
                String encryptedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encryptedPassword);
                log.debug("Changed password for User: {}", user);
            });
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAllByLoginNot(pageable, Constants.ANONYMOUS_USER).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthoritiesByLogin(String login) {
        return userRepository.findOneWithAuthoritiesByLogin(login);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(Long id) {
        return userRepository.findOneWithAuthoritiesById(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByLogin);
    }


    /**
     * @return a list of all the authorities
     */
    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }


    private String hashFileName(String fileName) {
        if (!fileName.isEmpty()) {
            String ext = FilenameUtils.getExtension(fileName);
            String[] body = fileName.split("."+ext);
            return DigestUtils.md5Hex(body[0]) + '.'+ext;
        }
        return "";
    }

    private boolean removeNonActivatedUser(User existingUser){
        if (existingUser.getActivated()) {
            return false;
        }
        userRepository.delete(existingUser);
        userRepository.flush();
        return true;
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
                password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
                password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }

    private static boolean isIdenticalPassword(String password, String re_password) {
        return password.equals(re_password);
    }
}
