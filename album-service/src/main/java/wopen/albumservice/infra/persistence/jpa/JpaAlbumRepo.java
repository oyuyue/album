package wopen.albumservice.infra.persistence.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.album.AlbumId;
import wopen.albumservice.domain.model.album.AlbumRepo;
import wopen.albumservice.domain.model.user.User;

import java.util.Optional;
import java.util.UUID;

public interface JpaAlbumRepo extends AlbumRepo, JpaRepository<Album, UUID> {
    Optional<Album> findByAlbumId(AlbumId albumId);
    Page<Album> findByUser(User user, Pageable pageable);

    Page<Album> findByUserAndPersonalFalse(User user, Pageable pageable);

    @Override
    default Optional<Album> find(AlbumId albumId) {
        return findByAlbumId(albumId);
    }

    @Override
    default Page<Album> findUserAlbums(User user, boolean includePersonal, Pageable pageable) {
        if (includePersonal) {
            return findByUserAndPersonalFalse(user, pageable);
        } else {
            return findByUser(user, pageable);
        }
    }
}
