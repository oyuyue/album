package wopen.albumservice.domain.model.tag;

import java.util.List;

public interface TagRepo {
    Tag save(Tag tag);

    List<Tag> findAllByNames(List<String> names);

    List<Tag> findAll();
}
