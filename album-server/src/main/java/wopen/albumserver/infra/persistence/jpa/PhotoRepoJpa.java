package wopen.albumserver.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import wopen.albumserver.domain.model.photo.Photo;
import wopen.albumserver.domain.model.photo.PhotoRepo;

import java.util.UUID;

public interface PhotoRepoJpa extends PhotoRepo, JpaRepository<Photo, UUID> {
}
