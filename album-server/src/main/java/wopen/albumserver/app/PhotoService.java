package wopen.albumserver.app;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import wopen.albumserver.domain.model.photo.Photo;
import wopen.albumserver.domain.model.photo.PhotoId;
import wopen.albumserver.domain.model.phototag.PhotoTag;

import java.util.List;

public interface PhotoService {
    Photo find(PhotoId id);

    Page<Photo> search(String term, List<PhotoTag> tags, Pageable pageable);
}
