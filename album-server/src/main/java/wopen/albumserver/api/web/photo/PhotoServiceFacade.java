package wopen.albumserver.api.web.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PhotoServiceFacade {
    Page<PhotoDTO> getPhotos(String term, List<String> tagNames, Pageable pageable);

    String updatePhoto(UpsertPhotoCommand command);

    String createPhoto(UpsertPhotoCommand command);

    PhotoDTO getPhoto(String id);

    void deletePhoto(String id);
}
