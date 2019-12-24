package wopen.albumservice.api.web.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceFacadeImpl implements PhotoServiceFacade {
    @Override
    public Page<PhotoDTO> getPhotos(String term, List<String> tagNames, Pageable pageable) {
        return null;
    }

    @Override
    public String updatePhoto(UpsertPhotoCommand command) {
        return null;
    }

    @Override
    public String createPhoto(UpsertPhotoCommand command) {
        return null;
    }

    @Override
    public PhotoDTO getPhoto(String id) {
        return null;
    }

    @Override
    public void deletePhoto(String id) {

    }
}
