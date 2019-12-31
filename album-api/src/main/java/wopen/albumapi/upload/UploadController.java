package wopen.albumapi.upload;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import wopen.albumservice.app.file.FileService;

@RestController
@RequestMapping(UploadController.BASE_URL)
public class UploadController {
    public static final String BASE_URL = "/upload";
    private final FileService fileService;

    public UploadController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable("filename") String fileName) {
        Resource resource = fileService.getResource(fileName);
        return ResponseEntity.ok(resource);
    }

    @PostMapping("/image")
    public UploadDto uploadImage(@RequestParam("file") MultipartFile file) {
        String url = fileService.storeImage(file);
        return new UploadDto(url);
    }
}
