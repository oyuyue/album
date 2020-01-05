package wopen.albumservice.domain.model.tag;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.logging.log4j.util.Strings;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.*;
import wopen.albumservice.domain.shared.Audit;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@ToString
@Getter
@Entity
@Table(name = "Tags")
@NaturalIdCache
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag implements Serializable {
    @Id
    @GeneratedValue
    private UUID id;
    @NaturalId
    @Nationalized
    @Column(nullable = false, unique = true)
    private String name;
    private String imageUrl;
    @Embedded
    private Audit audit = new Audit();

    public Tag(UpsertTagCommand command) {
        this.name = command.getName();
        this.imageUrl = command.getImageUrl();
    }

    public void update(UpsertTagCommand command) {
        if (Strings.isNotBlank(command.getName())) {
            this.name = command.getName();
        }
        this.imageUrl = command.getImageUrl();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return name.equals(tag.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
