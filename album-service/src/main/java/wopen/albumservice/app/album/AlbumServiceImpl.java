package wopen.albumservice.app.album;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wopen.albumservice.app.photo.PhotoService;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.album.*;
import wopen.albumservice.domain.model.user.User;
import wopen.albumservice.exception.ForbiddenException;
import wopen.albumservice.exception.ResourceNotFoundException;
import wopen.albumservice.infra.i18n.Messages;

@Service
@Transactional
public class AlbumServiceImpl implements AlbumService {
    private final AlbumRepo albumRepo;
    private final UserService userService;
    private final PhotoService photoService;

    public AlbumServiceImpl(
            AlbumRepo albumRepo,
            UserService userService,
            PhotoService photoService) {
        this.albumRepo = albumRepo;
        this.userService = userService;
        this.photoService = photoService;
    }

    @Override
    public Album upsertAlbum(UpsertAlbumCommand command) {
        if (command.getId() == null) {
            return createAlbum(command);
        }
        return updateAlbum(command);
    }

    @Override
    public Page<Album> getUserAlbums(String username, Pageable pageable) {
        User user = userService.getUserByUsername(username);
        boolean includePersonal = user.getUsername().equals(username);
        return albumRepo.findUserAlbums(user, includePersonal, pageable);
    }

    @Override
    public void deleteAlbum(String albumId) {
        Album album = getAlbum(albumId);
        checkAuthority(album);
        long count = photoService.photoQuantity(album);
        if (count > 0) throw new ForbiddenException(Messages.DELETE_ALBUM_HAS_PHOTO);
        albumRepo.delete(album);
    }

    private void checkAuthority(Album album) {
        if (!isCurrentUserAlbum(album)) {
            throw new ForbiddenException();
        }
    }

    @Override
    public void changeAlbumVisibility(ChangeAlbumVisibilityCommand command) {
        Album album = getAlbum(command.getAlbumId());
        checkAuthority(album);
        album.changeVisibility(command.getPersonal());
        albumRepo.save(album);
    }

    private boolean isCurrentUserAlbum(Album album) {
        String username = userService.getCurrentUsername();
        return username.equals(album.getUser().getUsername());
    }

    private Album createAlbum(UpsertAlbumCommand command) {
        Album album = new Album(command, userService.getCurrentUser());
        return albumRepo.save(album);
    }

    private Album updateAlbum(UpsertAlbumCommand command) {
        Album album = getAlbum(command.getId());
        album.update(command);
        return albumRepo.save(album);
    }

    @Override
    public Album getAlbum(String albumId) {
        return albumRepo.find(new AlbumId(albumId)).orElseThrow(ResourceNotFoundException::new);
    }
}
