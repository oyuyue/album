package wopen.albumservice.properties;

import lombok.Data;

@Data
public class UploadProperties {
    private String dir = "/app/data";
    private String urlPrefix = "/upload/";
}
