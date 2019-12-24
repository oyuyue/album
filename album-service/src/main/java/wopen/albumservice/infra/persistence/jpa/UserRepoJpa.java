package wopen.albumservice.infra.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.model.user.UserRepo;

import java.util.UUID;

public interface UserRepoJpa extends UserRepo, JpaRepository<User, UUID> {
}
