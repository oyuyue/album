package wopen.albumservice.domain.model.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Formula;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserStats {
    @Formula("(select count(1) from Photos p where p.user_id = id)")
    private long photoCount = 0L;
    @Formula("(select count(1) from Albums a where a.user_id = id)")
    private long albumCount = 0L;
    @Formula("(select count(1) from Photo_Likes pl where pl.user_id = id)")
    private long likeCount = 0L;
    @Formula("(select coalesce(sum(p.views),0) from Photos p where p.user_id = id)")
    private long viewedCount = 0L;
    @Formula("(select count(1) from Photos p left join Photo_Likes pl on pl.photo_id = p.id where p.user_id = id)")
    private long likedCount = 0L;
}
