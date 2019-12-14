package wopen.albumserver.domain.model.photolike;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import wopen.albumserver.domain.model.photo.Photo;
import wopen.albumserver.domain.model.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoLike implements Serializable {
    @EmbeddedId
    private PhotoLikeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("photo_id")
    private Photo photo;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_id")
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhotoLike photoLike = (PhotoLike) o;
        return photo.equals(photoLike.photo) &&
                user.equals(photoLike.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(photo, user);
    }
}
