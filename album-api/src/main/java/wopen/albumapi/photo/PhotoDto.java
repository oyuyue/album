package wopen.albumapi.photo;

import lombok.Data;
import wopen.albumservice.domain.model.photo.PhotoId;
import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.user.User;

import java.time.Instant;
import java.util.List;

@Data
public class PhotoDto {
    private PhotoId photoId;
    private Boolean personal;
    private String title;
    private String originImageUrl;
    private String imageUrl;
    private String imageFilterType;
    private Long views;
    private Instant createdAt;
    private Instant updatedAt;
    private List<Tag> tags;
    private User user;
}
