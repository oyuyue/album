package wopen.albumservice.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import wopen.albumservice.domain.model.photo.Photo;
import wopen.albumservice.domain.model.photo.PhotoRepo;

import java.util.UUID;

public interface PhotoRepoJpa extends PhotoRepo, JpaRepository<Photo, UUID> {
}
