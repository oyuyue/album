package wopen.albumservice.domain.model.photo;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.jetbrains.annotations.NotNull;
import wopen.albumservice.domain.shared.Utils;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoId implements Serializable {
    private String photoId;

    public PhotoId(@NotNull String id) {
        this.photoId = id;
    }

    public static PhotoId next() {
        return new PhotoId(Utils.uuidString());
    }

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
