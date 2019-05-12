package com.huyduc.manage.service;
import com.huyduc.manage.web.rest.errors.FileNotFoundException;
import com.huyduc.manage.web.rest.errors.FileStorageException;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Service class for upload file.
 **/
@Service
public class FileUploadService {

    private final Logger log = LoggerFactory.getLogger(FileUploadService.class);
    private static final Path ROOT_PATCH_UPLOAD = Paths.get(System.getProperty("user.home") + "/uploads/");

    public FileUploadService() {

    }

    /**
     * Save file in the store
     *
     * @param file,locale save store file
     * @return file name
     */
    public String storeFile(MultipartFile file, String locale) {
        String fileName = StringUtils.cleanPath(hashFileName(file.getOriginalFilename()));
        if (!checkExtensionFile(fileName)) throw new FileStorageException();
        try {
            Path fp = Paths.get("" + ROOT_PATCH_UPLOAD.resolve(locale));
            if (!Files.exists(ROOT_PATCH_UPLOAD)) {
                Files.createDirectory(ROOT_PATCH_UPLOAD);
            }
            if (!Files.exists(fp)) {
                Files.createDirectory(fp);
            }
            Path pathSaveFile = fp.resolve(hashFileName(file.getOriginalFilename()));
            Files.copy(file.getInputStream(), pathSaveFile, StandardCopyOption.REPLACE_EXISTING);
            log.debug("FileName: {}", fileName);
            return fileName;
        } catch (IOException e) {
            log.error("Create directory failed!: ", fileName);
            throw new FileStorageException();
        }
    }

    /**
     * get file in the store
     *
     * @param fileName the path file
     * @return resource
     */
    public Resource loadFileAsResource(String dir, String fileName) {
        try {
            Path filePath = this.ROOT_PATCH_UPLOAD.resolve(dir + "/" + fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                log.debug("File: {}", resource);
                return resource;
            } else {
                log.error("File not found!: ", fileName);
                throw new FileNotFoundException(fileName);
            }
        } catch (MalformedURLException ex) {
            log.error("File not found!: ", fileName);
            throw new FileNotFoundException(fileName);
        }
    }

    private String hashFileName(String fileName) {
        if (!fileName.isEmpty()) {
            String ext = FilenameUtils.getExtension(fileName);
            String[] body = fileName.split("." + ext);
            return DigestUtils.md5Hex(body[0]) + '.' + ext;
        }
        return "";
    }

    private boolean checkExtensionFile(String file) {
        String ext = FilenameUtils.getExtension(file);
        if (ext.toLowerCase().equals("jpg") || ext.toLowerCase().equals("jpeg") || ext.toLowerCase().equals("png") || ext.toLowerCase().equals("gif"))
            return true;
        return false;
    }
}