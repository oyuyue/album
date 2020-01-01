package wopen.albumservice.domain.model.tag;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class UpsertTagCommand {
    @NotBlank
    private String name;
    private String imageUrl;
}
