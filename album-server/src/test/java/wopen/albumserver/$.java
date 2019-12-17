package wopen.albumserver;

import java.util.Collection;
import java.util.List;

public class $ {
    public static <T> T prepareData(Class<T> cls){
        return DataGenerator.INSTANCE.fill(cls);
    }
}
