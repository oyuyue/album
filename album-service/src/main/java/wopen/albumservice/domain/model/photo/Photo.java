package wopen.albumservice.domain.model.photo;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.phototag.PhotoTag;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.shared.Audit;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@ToString
@Entity
@Table(name = "Photos")
@NaturalIdCache
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo implements Serializable{
    @Id
    @GeneratedValue
    private UUID id;
    @NaturalId
    @Embedded
    @Column(nullable = false, unique = true, updatable = false)
    private PhotoId photoId;
    private Boolean personal = false;
    @Nationalized
    private String title;
    private String originImageUrl;
    private String imageUrl;
    private String imageFilterType;
    private Long views = 0L;
    @Embedded
    private Audit audit = new Audit();

    @OneToMany(mappedBy = "photo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PhotoTag> tags = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToOne
    private Album album;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Photo photo = (Photo) o;
        return photoId.equals(photo.photoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(photoId);
    }
}
