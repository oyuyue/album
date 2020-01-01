package wopen.albumservice.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.album.AlbumId;
import wopen.albumservice.domain.model.album.AlbumRepo;

import java.util.Optional;
import java.util.UUID;

public interface JpaAlbumRepo extends AlbumRepo, JpaRepository<Album, UUID> {
    Optional<Album> findByAlbumId(AlbumId albumId);

    default Optional<Album> find(AlbumId albumId) {
        return findByAlbumId(albumId);
    }
}
