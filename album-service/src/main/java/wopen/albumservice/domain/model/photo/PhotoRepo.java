package wopen.albumservice.domain.model.photo;

public interface PhotoRepo {
//    Optional<Photo> find(PhotoId id);

    Photo save(Photo photo);

//    Page<Photo> search(String term, List<PhotoTag> tags, Pageable pageable);

//    void delete(PhotoId id);
}
