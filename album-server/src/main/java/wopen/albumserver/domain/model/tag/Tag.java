package wopen.albumserver.domain.model.tag;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.NaturalId;
import wopen.albumserver.domain.shared.Audit;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
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
