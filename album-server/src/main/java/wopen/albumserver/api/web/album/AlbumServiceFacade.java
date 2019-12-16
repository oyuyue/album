package wopen.albumserver.api.web.album;

import org.springframework.data.domain.Page;
import wopen.albumserver.api.web.album.AlbumDTO;

public interface AlbumServiceFacade {
    Page<AlbumDTO> getAlbums();
}
