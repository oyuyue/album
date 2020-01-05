package wopen.albumapi.upload;

import lombok.AllArgsConstructor;
import lombok.Data;
import wopen.albumservice.utils.$;

@Data
@AllArgsConstructor
public class UploadDto {
    private String url;

    public String getUrl() {
        return $.addUrlPrefix(url);
    }
}
