package wopen.albumservice.app.file;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import wopen.albumservice.exception.*;
import wopen.albumservice.infra.i18n.Messages;
import wopen.albumservice.properties.AppProperties;
import wopen.albumservice.properties.UploadProperties;
import wopen.albumservice.utils.$;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
public class FileServiceImpl implements FileService, InitializingBean {
    private final UploadProperties uploadProperties;
    private final Path rootLocation;

    public FileServiceImpl(AppProperties appProperties) {
        this.uploadProperties = appProperties.getUpload();
        this.rootLocation = Paths.get(appProperties.getUpload().getDir());
    }

    private void store(MultipartFile file, Path path) {
        try {
            Files.copy(file.getInputStream(), path);
        } catch (Throwable e) {
            log.error("上传文件失败", e);
            throw new UploadFailedException();
        }
    }

    @Override
    public String storeImage(MultipartFile file) {
        validate(file, "image/*");
        String fileName = $.uuidString() + getFileExtension(file.getOriginalFilename());
        Path path = rootLocation.resolve(fileName);
        log.debug(path.toString());
        store(file, path);
        return getResultUrl(fileName);
    }

    @Override
    public Resource getResource(String fileName) {
        Path file = rootLocation.resolve(fileName);
        try {
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists()) throw new ResourceNotFoundException();
            if (resource.isReadable()) throw new InternalServerException();
            return resource;
        } catch (MalformedURLException e) {
            log.error("加载资源失败", e);
            throw new InternalServerException();
        }
    }

    private String getResultUrl(String fileName) {
        String urlPrefix = uploadProperties.getUrlPrefix();
        if (!urlPrefix.endsWith("/")) urlPrefix += "/";
        return urlPrefix + fileName;
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) return "";
        int last = fileName.lastIndexOf(".");
        if (last < 0) return "";
        return fileName.substring(last);
    }

    private void validate(MultipartFile file, String mime) {
        if (file.isEmpty()) throw new BadUploadFileException();
        boolean valid = $.mimeCheck(mime, file.getContentType());
        if (!valid) throw new BadUploadFileException(Messages.ILLEGAL_FILE_TYPE);
    }

    private void createDirs() {
        try {
            Files.createDirectories(rootLocation);
        } catch (Throwable e) {
            log.error("创建 " + rootLocation + " 文件夹失败", e);
        }
    }

    @Override
    public void afterPropertiesSet() {
        createDirs();
    }
}
