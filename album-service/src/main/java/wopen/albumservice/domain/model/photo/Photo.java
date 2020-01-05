package wopen.albumservice.domain.model.photo;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.*;
import wopen.albumservice.domain.model.phototag.PhotoTag;
import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.shared.Audit;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toSet;

@ToString
@Getter
@Entity
@Table(name = "Photos")
@NaturalIdCache
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo implements Serializable {
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

    public Photo(UpsertPhotoCommand command, User user, Collection<Tag> tags) {
        this.user = user;
        this.photoId = PhotoId.next();
        this.update(command, tags);
    }

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

    public PhotoId getPhotoId() {
        return photoId;
    }

    public void update(UpsertPhotoCommand command, Collection<Tag> tags) {
        this.personal = command.getPersonal();
        this.title = command.getTitle();
        this.originImageUrl = command.getOriginImageUrl();
        this.imageUrl = command.getImageUrl();
        this.imageFilterType = command.getImageFilterType();
        this.tags = getPhotoTags(tags);
    }

    private Set<PhotoTag> getPhotoTags(Collection<Tag> tags) {
       if (tags == null || tags.size() == 0) return Collections.emptySet();
       return tags.stream().map(x-> new PhotoTag(this, x)).collect(toSet());
    }

    public void changeVisibility(Boolean personal) {
        if (personal == null) personal = false;
        this.personal = personal;
    }
}
