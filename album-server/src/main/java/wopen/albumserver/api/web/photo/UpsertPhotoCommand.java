package wopen.albumserver.api.web.photo;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UpsertPhotoCommand {
    @NotBlank
    private final String id;
}
