package wopen.albumserver.api.web.album;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class AlbumServiceFacadeImpl implements AlbumServiceFacade {
    @Override
    public Page<AlbumDTO> getAlbums() {
        return null;
    }
}
