package wopen.albumservice.infra.persistence.jpa;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import wopen.albumservice.domain.model.photo.Photo;
import wopen.albumservice.domain.model.photo.PhotoId;
import wopen.albumservice.domain.model.photo.PhotoRepo;
import wopen.albumservice.domain.model.user.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PhotoRepoJpa extends PhotoRepo, JpaRepository<Photo, UUID> {
    @Override
    default Optional<Photo> find(PhotoId photoId) {
        return findByPhotoId(photoId);
    }

    @Override
    default Page<Photo> findUserPhotos(User user, boolean includePersonal, Pageable pageable) {
        if (includePersonal) return findByUser(user, pageable);
        return findByUserAndPersonalFalse(user, pageable);
    }

    @Override
    default Page<Photo> search(String term, List<String> tags, Pageable pageable) {
        if (tags == null || tags.isEmpty()) {
            return findByTitleLike(term, pageable);
        }
        return findByTagNamesAndTitle(term, tags, pageable);
    }

    @Query("select pt.photo from PhotoTag pt where pt.tag.name in :tags and (:term is null or :term = '' or pt.photo.title like %:term%)")
    Page<Photo> findByTagNamesAndTitle(@Param("term") String term, @Param("tags") List<String> tags, Pageable pageable);

    Page<Photo> findByTitleLike(String term, Pageable pageable);

    Page<Photo> findByUser(User user, Pageable pageable);

    Page<Photo> findByUserAndPersonalFalse(User user, Pageable pageable);

    Optional<Photo> findByPhotoId(PhotoId photoId);
}
