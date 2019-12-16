package wopen.albumserver.api.photo.facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumserver.api.photo.web.CreatePhotoCommand;

import java.util.List;

public interface PhotoServiceFacade {
    Page<PhotoDTO> getPhotos(String term, List<String> tagNames, Pageable pageable);

    String updatePhoto(CreatePhotoCommand command);

    String createPhoto(CreatePhotoCommand command);

    PhotoDTO getPhoto(String id);

    void deletePhoto(String id);
}
