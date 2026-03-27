package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.repository.MediaRepository;
import com.CJSantos.Jornal_Primeiramente.service.MediaService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Data
@RestController("/media")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping
    public MediaModel createMedia(@RequestBody MediaModel media){
        return mediaService.createMedia(media);
    }

    @GetMapping
    public List<MediaModel> getAllMedia(){
        return mediaService.getAllMedia();
    }

    @GetMapping("/{id}")
    public MediaModel getMediaById(@PathVariable UUID id){
        return mediaService.getMediaById(id);
    }

    @PutMapping("/{id}")
    public MediaModel updateMedia(@PathVariable UUID id, @RequestBody MediaModel media){
        return mediaService.updateMedia(id, media);
    }

    @GetMapping("/user/{userId}")
    public List<MediaModel> getMediaByUser(@PathVariable UUID userId) {
        return mediaService.getMediaByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteMediaById(@PathVariable UUID id){
        mediaService.deleteMedia(id);
    }
}
