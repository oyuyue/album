package wopen.albumservice.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.tag.TagRepo;

import java.util.List;
import java.util.UUID;

public interface JpaTagRepo extends TagRepo, JpaRepository<Tag, UUID> {
    @Override
    default List<Tag> findAllByNames(List<String> names) {
        return findByNameIn(names);
    }

    List<Tag> findByNameIn(List<String> names);
}
