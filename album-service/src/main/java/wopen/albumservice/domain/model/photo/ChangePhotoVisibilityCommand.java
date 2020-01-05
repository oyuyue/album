package wopen.albumservice.domain.model.photo;

import lombok.Data;

@Data
public class ChangePhotoVisibilityCommand {
    String photoId;
    Boolean personal;
}
