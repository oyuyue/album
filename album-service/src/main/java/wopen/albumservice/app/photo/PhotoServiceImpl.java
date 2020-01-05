package wopen.albumservice.app.photo;

import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wopen.albumservice.app.tag.TagService;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.photo.*;
import wopen.albumservice.domain.model.tag.Tag;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.exception.ForbiddenException;
import wopen.albumservice.exception.ResourceNotFoundException;

import java.util.List;

@Service
@Transactional
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepo photoRepo;
    private final UserService userService;
    private final TagService tagService;

    public PhotoServiceImpl(
            PhotoRepo photoRepo,
            UserService userService,
            TagService tagService) {
        this.photoRepo = photoRepo;
        this.userService = userService;
        this.tagService = tagService;
    }

    @Override
    public Photo find(String photoId) {
        Photo photo = photoRepo.find(new PhotoId(photoId)).orElseThrow(ResourceNotFoundException::new);

        if (photo.getPersonal() && isNotCurrentUser(photo.getUser())) throw new ResourceNotFoundException();

        return photo;
    }

    @Override
    public Photo upsertPhoto(UpsertPhotoCommand command) {
        if (command.getPhotoId() == null) {
            return createPhoto(command);
        }
        return updatePhoto(command);
    }

    @Override
    public void changePhotoVisibility(ChangePhotoVisibilityCommand command) {
        Photo photo = find(command.getPhotoId());
        checkPermission(photo.getUser());
        photo.changeVisibility(command.getPersonal());
    }

    @Override
    public void deletePhoto(String photoId) {
        Photo photo = find(photoId);
        checkPermission(photo.getUser());
        photoRepo.delete(photo);
    }

    @Override
    public Page<Photo> search(String term, String username, List<String> tags, Pageable pageable) {
        if (Strings.isNotBlank(username)) {
            return getUserPhotos(username, pageable);
        }

        return photoRepo.search(term, tags, pageable);
    }

    private Page<Photo> getUserPhotos(String username, Pageable pageable) {
        User user = userService.getUserByUsername(username);
        User currentUser = null;
        try {
            currentUser = userService.getCurrentUser();
        } catch (Exception ignored) {
        }
        return photoRepo.findUserPhotos(user, user.equals(currentUser), pageable);
    }

    private boolean isNotCurrentUser(User user) {
        return !userService.getCurrentUser().equals(user);
    }

    private Photo updatePhoto(UpsertPhotoCommand command) {
        Photo photo = find(command.getPhotoId());
        checkPermission(photo.getUser());
        photo.update(command, getTags(command.getTags()));
        return photoRepo.save(photo);
    }

    private void checkPermission(User user) {
        if (isNotCurrentUser(user)) {
            throw new ForbiddenException();
        }
    }

    private Photo createPhoto(UpsertPhotoCommand command) {
        User user = userService.getCurrentUser();
        Photo photo = new Photo(command, user, getTags(command.getTags()));
        return photoRepo.save(photo);
    }

    private List<Tag> getTags(List<String> names) {
        return tagService.findByNames(names);
    }
}
