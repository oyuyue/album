package wopen.albumservice.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.tag.TagRepo;

import java.util.UUID;

public interface JpaTagRepo extends TagRepo, JpaRepository<Tag, UUID> {
}
