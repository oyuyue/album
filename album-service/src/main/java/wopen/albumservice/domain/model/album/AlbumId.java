package wopen.albumservice.domain.model.album;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import wopen.albumservice.utils.$;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AlbumId implements Serializable {
    private String albumId;

    public static AlbumId next() {
        return new AlbumId($.uuidString());
    }

    public String id() {
        return albumId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlbumId albumId = (AlbumId) o;
        return this.albumId.equals(albumId.albumId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(albumId);
    }
}
