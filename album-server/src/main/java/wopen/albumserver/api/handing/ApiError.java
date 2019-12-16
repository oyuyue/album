package wopen.albumserver.api.handing;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class ApiError implements Serializable {
    private String message;

    public static ApiError of (String msg) {
        return new ApiError(msg);
    }
}
