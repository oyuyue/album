package wopen.albumserver.domain.model.photo;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoId implements Serializable {
    private String photoId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhotoId photoId = (PhotoId) o;
        return this.photoId.equals(photoId.photoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(photoId);
    }
}
