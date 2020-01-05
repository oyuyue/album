package wopen.albumapi.album;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import wopen.albumapi.shared.IdDto;
import wopen.albumservice.app.album.AlbumService;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.album.ChangeAlbumVisibilityCommand;
import wopen.albumservice.domain.model.album.UpsertAlbumCommand;
import wopen.albumservice.utils.$;

@RestController
@RequestMapping(AlbumController.BASE_URL)
public class AlbumController {
    public static final String BASE_URL = "/albums";
    private final AlbumService albumService;
    private final AlbumMapper albumMapper;

    public AlbumController(AlbumService albumService, AlbumMapper albumMapper) {
        this.albumService = albumService;
        this.albumMapper = albumMapper;
    }

    @GetMapping
    public Page<AlbumDto> getAlbums(
            @RequestParam("username") String username,
            @PageableDefault(size = 12) Pageable pageable) {
        Page<Album> albums = albumService.getUserAlbums(username, pageable);
        return albums.map(albumMapper::toDto);
    }

    @PostMapping("/actions/change-visibility")
    public void changeAlbumVisibility(@RequestBody ChangeAlbumVisibilityCommand command) {
        albumService.changeAlbumVisibility(command);
    }

    @DeleteMapping("/{albumId}")
    public void deleteAlbum(@PathVariable("albumId") String albumId) {
        albumService.deleteAlbum(albumId);
    }

    @PostMapping
    public IdDto upsertAlbums(@RequestBody UpsertAlbumCommand command) {
        command.setImageUrl($.extraFileName(command.getImageUrl()));
        Album album = albumService.upsertAlbum(command);
        return new IdDto(album.getAlbumId().id());
    }
}
