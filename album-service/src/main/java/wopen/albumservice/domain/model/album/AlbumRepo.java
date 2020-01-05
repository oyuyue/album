package wopen.albumservice.domain.model.album;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumservice.domain.model.user.User;

import java.util.Optional;

public interface AlbumRepo {
    Page<Album> findUserAlbums(User user, boolean includePersonal, Pageable pageable);
    Optional<Album> find(AlbumId albumId);
    Album save(Album album);

    void delete(Album album);
}
