package wopen.albumservice.api.web.album;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

//@RestController
//@RequestMapping("/albums")
//public class AlbumController {
//    private final AlbumServiceFacade albumServiceFacade;
//
//
//    public AlbumController(AlbumServiceFacade albumServiceFacade) {
//        this.albumServiceFacade = albumServiceFacade;
//    }
//
//    @GetMapping
//    public void getAlbums(
//            @RequestParam(value = "term", required = false) String term,
//            @RequestParam(value = "categories", required = false) List<String> categories,
//            Pageable pageable,
//            HttpSession session,
//            HttpServletRequest req
//    ) {
//    }
//}
