package wopen.albumcore.utils;

import java.util.UUID;

public final class $ {
    private $(){}

    public static String uuidString() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
