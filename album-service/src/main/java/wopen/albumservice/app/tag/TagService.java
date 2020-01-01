package wopen.albumservice.app.tag;

import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.tag.UpsertTagCommand;

public interface TagService {
    Tag createTag(UpsertTagCommand command);
    Tag createTag(String name, String imageUrl);
    Tag createTag(String name);
}
