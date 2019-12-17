package wopen.albumserver.domain.shared;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class Utils {
    public static String uuidString() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
