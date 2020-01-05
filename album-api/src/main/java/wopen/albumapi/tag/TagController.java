package wopen.albumapi.tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wopen.albumservice.app.tag.TagService;
import wopen.albumservice.domain.model.tag.Tag;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping(TagController.BASE_URL)
public class TagController {
    public static final String BASE_URL = "/tags";
    private final TagService tagService;
    private final TagMapper tagMapper;

    public TagController(TagService tagService, TagMapper tagMapper) {
        this.tagService = tagService;
        this.tagMapper = tagMapper;
    }

    @GetMapping
    public List<TagDto> getTags() {
        List<Tag> tags = tagService.getAllTags();
        return tags.stream().map(tagMapper::toDto).collect(toList());
    }
}
