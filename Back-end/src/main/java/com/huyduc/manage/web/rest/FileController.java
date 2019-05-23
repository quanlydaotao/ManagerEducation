package com.huyduc.manage.web.rest;

import com.huyduc.manage.bean.User;
import com.huyduc.manage.repository.UserRepository;
import com.huyduc.manage.service.FileUploadService;
import com.huyduc.manage.service.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

/**
 * File controller for managing the current file upload
 */
@RestController
@RequestMapping("/api")
public class FileController {
    private static final Logger log = LoggerFactory.getLogger(FileController.class);
    private final FileUploadService fileUploadService;
    private final UserRepository userRepository;

    public FileController(FileUploadService fileUploadService, UserRepository userRepository) {
        this.fileUploadService = fileUploadService;
        this.userRepository = userRepository;
    }

    /**
     * GET / : download file.
     *
     * @param fileName,dir the path file image avatar
     */
    @GetMapping(value = "/file/{dir}/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable(name="dir") String dir, @PathVariable(name="fileName") String fileName, HttpServletRequest request) {
        Resource resource = fileUploadService.loadFileAsResource(dir, fileName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    /**
     * POST  /upload : upload the file.
     *
     * @param image,dir the file image
     */
    @PostMapping(value = "/file/upload", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public String uploadFile(@RequestParam("image") MultipartFile image, @RequestParam("dir") String dir) {
        String resFile = fileUploadService.storeFile(image, dir);
        return "{\"message\":\"Upload thành công!\"}";
    }

    /**
     * POST  /update : update the file.
     *
     * @param image,dir the file image
     */
    @PutMapping(value = "/file/update", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public String updateFile(@RequestParam("image") MultipartFile image, @RequestParam("dir") String dir, @RequestParam("id") Long id) {
        Optional<UserDTO> user1 = Optional.of(userRepository
                .findById(id))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(user -> {

                    log.debug("Changed Information for User: {}", user);
                    return user;
                }).map(UserDTO::new);
        String resFile = fileUploadService.updateFile(image, dir, user1.get().getImageUrl());
        return "{\"message\":\"Upload thành công!\"}";
    }


}
