package wopen.albumservice.app.tag;

import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.tag.UpsertTagCommand;

import java.util.List;

public interface TagService {
    Tag createTag(UpsertTagCommand command);

    Tag createTag(String name, String imageUrl);

    Tag createTag(String name);

    List<Tag> findByNames(List<String> names);

    List<Tag> getAllTags();
}
