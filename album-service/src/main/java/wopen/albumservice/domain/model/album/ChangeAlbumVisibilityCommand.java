package wopen.albumservice.domain.model.album;

import lombok.Data;

@Data
public class ChangeAlbumVisibilityCommand {
    String albumId;
    Boolean personal;
}
