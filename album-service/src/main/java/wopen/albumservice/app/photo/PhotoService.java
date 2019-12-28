package wopen.albumservice.app.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumservice.domain.model.photo.Photo;
import wopen.albumservice.domain.model.photo.PhotoId;
import wopen.albumservice.domain.model.phototag.PhotoTag;

import java.util.List;

public interface PhotoService {
    Photo find(PhotoId id);

    Page<Photo> search(String term, List<PhotoTag> tags, Pageable pageable);
}
