package wopen.albumservice.utils;

import org.apache.logging.log4j.util.Strings;

import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Objects;
import java.util.UUID;

public final class $ {
    private $() {
    }

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

    public static String extraFileName(String url) {
        if (url == null) return "";
        return Paths.get(url).getFileName().toString();
    }

    public static String concatUrl(String... urls) {
        return Arrays.stream(urls).filter(Objects::nonNull).reduce("", (a, b) -> {
            if (Strings.isNotBlank(a) && !a.endsWith("/")) a += "/";
            return a + b;
        });
    }

    public static String maskEmail(String email) {
        if (email == null || Strings.isBlank(email)) return "";
        String[] prices = email.split("@");
        if (prices.length != 2) return email;
        String h = prices[0];
        if (Strings.isBlank(h)) return email;
        if (h.length() == 1) h += h;
        return h.substring(0, 2) + "*****" + h.charAt(h.length() - 1) + "@" + prices[1];
    }
}
