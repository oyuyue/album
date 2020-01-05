package wopen.albumservice.domain.model.album;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.*;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.domain.shared.Audit;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@ToString
@Entity
@Table(name = "Albums")
@NaturalIdCache
@Getter
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album implements Serializable {
    @Id
    @GeneratedValue
    private UUID id;
    @NaturalId
    @Embedded
    @Column(nullable = false, updatable = false, unique = true)
    private AlbumId albumId;
    @Nationalized
    private String title;
    private String imageUrl;
    private Boolean personal = false;
    @Embedded
    private Audit audit = new Audit();

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Album(UpsertAlbumCommand command, User user) {
        this.albumId = AlbumId.next();
        this.imageUrl = command.getImageUrl();
        this.title = command.getTitle();
        this.personal = command.getPersonal();
        this.user = user;
    }

    public void update(UpsertAlbumCommand command) {
        this.title = command.getTitle();
        this.imageUrl = command.getImageUrl();
        this.personal = command.getPersonal();
    }

    public AlbumId getAlbumId() {
        return albumId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Album album = (Album) o;
        return albumId.equals(album.albumId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(albumId);
    }

    public void changeVisibility(Boolean personal) {
        if (personal == null) return;
        this.personal = personal;
    }
}
