package wopen.albumservice.app.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String storeImage(MultipartFile file);

    Resource getResource(String fileName);
}
