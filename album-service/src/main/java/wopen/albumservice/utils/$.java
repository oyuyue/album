package wopen.albumservice.utils;

import java.util.UUID;

public final class $ {
    private $(){}

    public static String uuidString() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static boolean mimeCheck(String mime, String toCheck) {
        if (toCheck == null) return false;
        if (mime == null || mime.equals("*") || mime.equals("*/*")) return true;
        String[] expect = mime.split("/");
        String[] check = toCheck.split("/");
        if (expect.length != 2 || check.length != 2) return false;
        if (!expect[0].equalsIgnoreCase(check[0])) return false;
        if ("*".equals(expect[1])) return true;
        return expect[1].equalsIgnoreCase(check[1]);
    }
}
