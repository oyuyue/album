package wopen.albumserver.domain.model.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumserver.domain.model.phototag.PhotoTag;

import java.util.List;
import java.util.Optional;

public interface PhotoRepo {
    Optional<Photo> find(PhotoId id);

    Photo save(Photo photo);

    Page<Photo> search(String term, List<PhotoTag> tags, Pageable pageable);

    void delete(PhotoId id);
}
