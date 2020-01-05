package wopen.albumservice.app.album;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.album.ChangeAlbumVisibilityCommand;
import wopen.albumservice.domain.model.album.UpsertAlbumCommand;

public interface AlbumService {
    Album upsertAlbum(UpsertAlbumCommand command);

    Page<Album> getUserAlbums(String username, Pageable pageable);

    void deleteAlbum(String albumId);

    void changeAlbumVisibility(ChangeAlbumVisibilityCommand command);

    Album getAlbum(String albumId);
}
