package wopen.albumserver.domain.model.phototag;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoTagId implements Serializable {
    @Column(name = "photo_id")
    private UUID photoId;

    @Column(name = "tag_id")
    private UUID tagId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhotoTagId that = (PhotoTagId) o;
        return photoId.equals(that.photoId) &&
                tagId.equals(that.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(photoId, tagId);
    }
}
