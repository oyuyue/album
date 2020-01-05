package wopen.albumapi.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import wopen.albumapi.shared.IdDto;
import wopen.albumservice.domain.model.photo.ChangePhotoVisibilityCommand;
import wopen.albumservice.domain.model.photo.UpsertPhotoCommand;
import wopen.albumservice.app.photo.PhotoService;
import wopen.albumservice.domain.model.photo.Photo;

import java.util.List;

@RestController
@RequestMapping(PhotoController.BASE_URL)
public class PhotoController {
    public static final String BASE_URL = "/photos";
    private final PhotoService photoService;
    private final PhotoMapper photoMapper;

    public PhotoController(PhotoService photoService, PhotoMapper photoMapper) {
        this.photoService = photoService;
        this.photoMapper = photoMapper;
    }

    @GetMapping("/{photoId}")
    public PhotoDto getPhoto(@PathVariable("photoId") String photoId) {
        Photo photo = photoService.find(photoId);
        return photoMapper.toDto(photo);
    }

    @GetMapping
    public Page<PhotoDto> getPhotos(
            @RequestParam(value = "term", required = false) String term,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "tags", required = false) List<String> tags,
            @PageableDefault(size = 12) Pageable pageable
    ) {
        Page<Photo> photos = photoService.search(term, username, tags, pageable);
        return photos.map(photoMapper::toDto);
    }

    @PostMapping
    public IdDto upsertPhoto(UpsertPhotoCommand command) {
        Photo photo = photoService.upsertPhoto(command);
        return new IdDto(photo.getPhotoId().id());
    }

    @PostMapping("/actions/change-visibility")
    public void changeAlbumVisibility(@RequestBody ChangePhotoVisibilityCommand command) {
        photoService.changePhotoVisibility(command);
    }

    @DeleteMapping("/{photoId}")
    public void deleteAlbum(@PathVariable("photoId") String photoId) {
        photoService.deletePhoto(photoId);
    }
}
