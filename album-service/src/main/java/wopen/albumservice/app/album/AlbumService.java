package wopen.albumservice.app.album;

import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.album.UpsertAlbumCommand;

public interface AlbumService {
    Album upsertAlbum(UpsertAlbumCommand command);
}
