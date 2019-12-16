package wopen.albumserver.api.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class ListStringConverter implements Converter<String, List<String>> {
    @Override
    public List<String> convert(String s) {
        return Arrays.stream(s.split(",")).map(String::trim).collect(toList());
    }
}
