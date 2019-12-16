package wopen.albumserver.api.handing;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
public class ApiError implements Serializable {
    private String msg;
    private Map<String, String> errors;

    public ApiError(String msg) {
        this.msg = msg;
    }

    public static ApiError of(String msg) {
        return new ApiError(msg);
    }

    public static ApiError of(String msg, Map<String, String> errors) {
        return new ApiError(msg, errors);
    }
}
