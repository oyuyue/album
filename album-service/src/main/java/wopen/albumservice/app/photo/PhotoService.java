package wopen.albumservice.app.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.photo.ChangePhotoVisibilityCommand;
import wopen.albumservice.domain.model.photo.Photo;
import wopen.albumservice.domain.model.photo.UpsertPhotoCommand;

import java.util.List;

public interface PhotoService {
    Photo find(String photoId);

    long photoQuantity(Album album);

    Photo upsertPhoto(UpsertPhotoCommand command);

    void changePhotoVisibility(ChangePhotoVisibilityCommand command);

    void deletePhoto(String photoId);

    Page<Photo> search(String term, String username, List<String> tags, Pageable pageable);
}
