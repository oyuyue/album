package wopen.albumservice.app.tag;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.tag.TagRepo;
import wopen.albumservice.domain.model.tag.UpsertTagCommand;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class TagServiceImpl implements TagService {
    private final TagRepo tagRepo;

    public TagServiceImpl(TagRepo tagRepo) {
        this.tagRepo = tagRepo;
    }

    @Override
    public Tag createTag(UpsertTagCommand command) {
        Tag tag = new Tag(command);
        return tagRepo.save(tag);
    }

    @Override
    public Tag createTag(String name, String imageUrl) {
        return createTag(new UpsertTagCommand(name, imageUrl));
    }

    @Override
    public Tag createTag(String name) {
        return createTag(name, null);
    }

    @Override
    public List<Tag> findByNames(List<String> names) {
        if (names == null || names.size() == 0) return Collections.emptyList();
        return tagRepo.findAllByNames(names);
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepo.findAll();
    }
}
