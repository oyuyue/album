package wopen.albumserver.domain.model.phototag;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import wopen.albumserver.domain.model.photo.Photo;
import wopen.albumserver.domain.model.tag.Tag;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoTag implements Serializable {
    @EmbeddedId
    private PhotoTagId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("photo_id")
    private Photo photo;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tag_id")
    private Tag tag;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhotoTag photoTag = (PhotoTag) o;
        return photo.equals(photoTag.photo) &&
                tag.equals(photoTag.tag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(photo, tag);
    }
}
