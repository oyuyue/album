package wopen.albumservice.domain.model.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.user.User;

import java.util.List;
import java.util.Optional;

public interface PhotoRepo {

    Photo save(Photo photo);

    long countByAlbum(Album album);

    Optional<Photo> find(PhotoId photoId);

    void delete(Photo photo);

    Page<Photo> findUserPhotos(User user, boolean includePersonal, Pageable pageable);

    Page<Photo> search(String term, List<String> tags, Pageable pageable);
}
