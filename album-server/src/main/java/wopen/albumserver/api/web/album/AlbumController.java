package wopen.albumserver.api.web.album;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wopen.albumserver.app.exception.HttpException;

import java.util.List;

@RestController
@RequestMapping("/albums")
public class AlbumController {
    private final AlbumServiceFacade albumServiceFacade;

    public AlbumController(AlbumServiceFacade albumServiceFacade) {
        this.albumServiceFacade = albumServiceFacade;
    }

    @GetMapping
    public void getAlbums(
        @RequestParam(value = "term", required = false) String term,
        @RequestParam(value = "categories", required = false) List<String> categories,
        Pageable pageable
    ) {
        throw new HttpException(HttpStatus.BAD_REQUEST);
    }
}
