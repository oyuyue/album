package wopen.albumserver.domain.model.album;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumId implements Serializable {
    private String id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlbumId albumId = (AlbumId) o;
        return id.equals(albumId.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
