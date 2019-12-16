package wopen.albumserver.domain.model.photo;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.jetbrains.annotations.NotNull;
import wopen.albumserver.domain.shared.Utils;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoId implements Serializable {
    private String id;

    public PhotoId(@NotNull String id) {
        this.id = id;
    }

    public static PhotoId next() {
        return new PhotoId(Utils.uuidString());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhotoId photoId = (PhotoId) o;
        return id.equals(photoId.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
