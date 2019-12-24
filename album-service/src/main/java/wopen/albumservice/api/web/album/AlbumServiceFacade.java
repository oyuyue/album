package wopen.albumservice.api.web.album;

import org.springframework.data.domain.Page;

public interface AlbumServiceFacade {
    Page<AlbumDTO> getAlbums();
}
