package wopen.albumapi.upload;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UploadController.BASE_URL)
public class UploadController {
    public static final String BASE_URL = "/upload";

    @PostMapping("/image")
    public UploadDto uploadImage() {
        return null;
    }
}
