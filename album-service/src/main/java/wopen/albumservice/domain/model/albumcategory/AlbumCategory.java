package wopen.albumservice.domain.model.albumcategory;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.ToString;
import wopen.albumservice.domain.model.Category.Category;
import wopen.albumservice.domain.model.album.Album;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Entity
@Table(name = "Album_Categories")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumCategory implements Serializable {
    @EmbeddedId
    private AlbumCategoryId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("album_id")
    private Album album;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("category_id")
    private Category category;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlbumCategory that = (AlbumCategory) o;
        return album.equals(that.album) &&
                category.equals(that.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(album, category);
    }
}
