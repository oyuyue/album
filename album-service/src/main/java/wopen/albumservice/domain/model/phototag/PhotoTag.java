package wopen.albumservice.domain.model.phototag;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import wopen.albumservice.domain.model.photo.Photo;
import wopen.albumservice.domain.model.tag.Tag;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Getter
@Entity
@Table(name = "Photo_Tags")
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

    public PhotoTag(Photo photo, Tag tag) {
        this.photo = photo;
        this.tag = tag;
    }

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
