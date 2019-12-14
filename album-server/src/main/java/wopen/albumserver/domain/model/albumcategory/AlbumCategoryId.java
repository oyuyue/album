package wopen.albumserver.domain.model.albumcategory;

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
public class AlbumCategoryId implements Serializable {
    @Column(name = "album_id")
    private UUID albumId;

    @Column(name = "category_id")
    private UUID categoryId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlbumCategoryId that = (AlbumCategoryId) o;
        return albumId.equals(that.albumId) &&
                categoryId.equals(that.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(albumId, categoryId);
    }
}
