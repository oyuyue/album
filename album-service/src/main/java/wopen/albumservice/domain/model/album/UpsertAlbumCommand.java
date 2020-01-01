package wopen.albumservice.domain.model.album;

import lombok.Data;

@Data
public class UpsertAlbumCommand {
    private String id;
    private String title;
    private String imageUrl;
    private Boolean personal;
}
