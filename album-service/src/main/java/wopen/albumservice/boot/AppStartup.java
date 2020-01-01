package wopen.albumservice.boot;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import wopen.albumservice.app.tag.TagService;

@Component
@Slf4j
public class AppStartup implements ApplicationRunner {
    private final TagService tagService;

    public AppStartup(TagService tagService) {
        this.tagService = tagService;
    }

    @Override
    public void run(ApplicationArguments args) {
        prepareTags();
        log.info("创建标签完成");
    }

    private void prepareTags() {
        tagService.createTag("人物");
        tagService.createTag("风景");
        tagService.createTag("美女");
        tagService.createTag("动漫卡通");
        tagService.createTag("娱乐明星");
        tagService.createTag("萌宠");
        tagService.createTag("汽车");
        tagService.createTag("游戏");
    }
}
