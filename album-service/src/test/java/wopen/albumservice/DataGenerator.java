package wopen.albumservice;

import org.apache.commons.lang3.RandomStringUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.regex.Pattern;

public class DataGenerator {
    private final Random random = new Random();
    private final Pattern singleGeneric = Pattern.compile(".*<(.*)>");
    public static final DataGenerator INSTANCE = new DataGenerator();

    private DataGenerator() {}

    public <T> T fill(Class<T> cls) {
        return fill(cls, new ArrayList<>());
    }

    private  <T> T fill(Class<T> cls, List<Object> parents) {
        boolean match = parents.stream().anyMatch(cls::isInstance);
        if (match) return null;
        T o = newInstance(cls, parents);
        if (o == null) return null;
        if (isSimple(o)) return o;

        Field[] fields = o.getClass().getDeclaredFields();
        parents.add(o);

        for (Field field : fields) {
            field.setAccessible(true);
            try {
                field.set(o, newInstance(field, parents));
            } catch (Exception ignored) {
            }
        }

        return o;
    }

    private <T> boolean isSimple(T o) {
        Class<?> t = o.getClass();
        if (t.isPrimitive() || t.isInterface() || t.isEnum() || t.isAnnotation()) return true;

        if (o instanceof Collection || o instanceof Map) return true;

        return t == String.class || t == Integer.class || t == Long.class || t == Double.class || t == BigDecimal.class || t == Instant.class || t == Boolean.class || UUID.class.isAssignableFrom(t);
    }

    private Object newInstance(Field field, List<Object> parents) {
        Class<?> t = field.getType();
        String tn = field.getGenericType().getTypeName();

        if (List.class.isAssignableFrom(t) || Set.class.isAssignableFrom(t)) {
            tn = singleGeneric.matcher(tn).replaceAll("$1");
            try {
                Object filled = fill(Class.forName(tn), parents);
                Collection<Object> coll = List.class.isAssignableFrom(t) ? new ArrayList<>() : new HashSet<>();
                coll.add(filled);
                return coll;
            } catch (ClassNotFoundException e) {
                return new ArrayList<>();
            }
        }

        return fill(t, parents);
    }

    @SuppressWarnings("unchecked")
    private <T> T newInstance(Class<T> cls, List<Object> parents) {
        if (cls.isEnum() || cls.isInterface() || cls.isAnnotation()) return null;
        if (Optional.class.isAssignableFrom(cls)) return null;
        if (String.class.isAssignableFrom(cls)) return (T) RandomStringUtils.randomAlphabetic(10);
        if (cls == Integer.class || cls == int.class) return (T) Integer.valueOf(random.nextInt());
        if (cls == Long.class || cls == long.class) return (T) Long.valueOf(random.nextLong());
        if (cls == Double.class || cls == double.class) return (T) Double.valueOf(random.nextDouble());
        if (cls == Boolean.class || cls == boolean.class) return (T) Boolean.valueOf(random.nextBoolean());
        if (BigDecimal.class.isAssignableFrom(cls)) return (T) BigDecimal.valueOf(random.nextDouble());
        if (Instant.class.isAssignableFrom(cls)) return (T) Instant.now().minus(random.nextInt(10), ChronoUnit.DAYS);
        if (UUID.class.isAssignableFrom(cls)) return (T) UUID.randomUUID();
        if (Map.class.isAssignableFrom(cls)) return (T) new HashMap<>();
        if (Set.class.isAssignableFrom(cls)) return (T) new HashSet<>();
        if (List.class.isAssignableFrom(cls)) return (T) new ArrayList<>();

        Constructor<?>[] cons = cls.getDeclaredConstructors();

        for (Constructor<?> con : cons) {
            con.setAccessible(true);
            Class<?>[] pts = con.getParameterTypes();
            try {
                if (pts.length == 0) return (T) con.newInstance();
                Object[] pto = new Object[pts.length];
                for (int i = 0; i < pts.length; i++) {
                    pto[i] = fill(pts[i], parents);
                }
                return (T) con.newInstance(pto);
            } catch (Exception ignored) {
            }
        }

        return null;
    }

}
