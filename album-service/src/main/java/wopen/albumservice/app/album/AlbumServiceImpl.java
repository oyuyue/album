package wopen.albumservice.app.album;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wopen.albumservice.app.user.UserService;
import wopen.albumservice.domain.model.album.Album;
import wopen.albumservice.domain.model.album.AlbumId;
import wopen.albumservice.domain.model.album.AlbumRepo;
import wopen.albumservice.domain.model.album.UpsertAlbumCommand;
import wopen.albumservice.exception.ResourceNotFoundException;

@Service
@Transactional
public class AlbumServiceImpl implements AlbumService {
    private final AlbumRepo albumRepo;
    private final UserService userService;

    public AlbumServiceImpl(AlbumRepo albumRepo, UserService userService) {
        this.albumRepo = albumRepo;
        this.userService = userService;
    }

    @Override
    public Album upsertAlbum(UpsertAlbumCommand command) {
        if (command.getId() == null) {
            return createAlbum(command);
        }
        return updateAlbum(command);
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

    private Album getAlbum(String albumId) {
        return albumRepo.find(new AlbumId(albumId)).orElseThrow(ResourceNotFoundException::new);
    }
}
