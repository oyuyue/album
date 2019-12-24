package wopen.albumservice.api.web.photo;

import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(PhotoController.BASE_URL)
public class PhotoController {
    public static final String BASE_URL = "/photos";

    private final PhotoServiceFacade photoServiceFacade;

    public PhotoController(PhotoServiceFacade photoServiceFacade) {
        this.photoServiceFacade = photoServiceFacade;
    }

    @GetMapping
    public Page<PhotoDTO> getPhotos(
            @RequestParam("term") String term,
            @RequestParam("tags") String tags,
            Pageable pageable
    ) {
        List<String> tagNames = new ArrayList<>();
        if(Strings.isNotBlank(tags)) tagNames.addAll(Arrays.asList(tags.split(",")));
        return photoServiceFacade.getPhotos(term, tagNames, pageable);
    }

    @PostMapping
    public String upsertPhoto(UpsertPhotoCommand command) {
        if (Strings.isNotBlank(command.getId())) {
            return photoServiceFacade.updatePhoto(command);
        }
        return photoServiceFacade.createPhoto(command);
    }

    @DeleteMapping("/{id}")
    public void deletePhoto(@PathVariable("id") String id) {
        photoServiceFacade.deletePhoto(id);
    }

    @GetMapping("/{id}")
    public PhotoDTO getPhoto(@PathVariable("id") String id) {
        return photoServiceFacade.getPhoto(id);
    }

}
