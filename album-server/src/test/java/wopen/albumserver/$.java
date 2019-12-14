package wopen.albumserver;

public class $ {
    public static <T> T prepareData(Class<T> cls){
        return DataGenerator.INSTANCE.fill(cls);
    }
}
