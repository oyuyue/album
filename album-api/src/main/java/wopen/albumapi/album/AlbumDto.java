package wopen.albumapi.album;

import lombok.Data;
import wopen.albumservice.domain.model.album.AlbumId;
import wopen.albumservice.utils.$;

import java.time.Instant;
import java.util.UUID;

@Data
public class AlbumDto {
    private UUID id;
    private AlbumId albumId;
    private String title;
    private String imageUrl;
    private Boolean personal;
    private Instant createdAt;
    private Instant updatedAt;

    public String getImageUrl() {
        return $.addUrlPrefix(imageUrl);
    }
}
