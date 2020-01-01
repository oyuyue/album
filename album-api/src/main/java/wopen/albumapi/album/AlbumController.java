package wopen.albumapi.album;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import wopen.albumapi.shared.IdDto;
import wopen.albumservice.api.web.album.AlbumDTO;
import wopen.albumservice.app.album.AlbumService;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.album.UpsertAlbumCommand;
import wopen.albumservice.utils.$;

@RestController
@RequestMapping(AlbumController.BASE_URL)
public class AlbumController {
    public static final String BASE_URL = "/albums";
    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public Page<AlbumDTO> getAlbums() {
        return Page.empty();
    }

    @PostMapping
    public IdDto upsertAlbums(@RequestBody UpsertAlbumCommand command) {
        command.setImageUrl($.extraFileName(command.getImageUrl()));
        Album album = albumService.upsertAlbum(command);
        return new IdDto(album.getAlbumId().id());
    }
}
