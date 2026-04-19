package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.repository.MediaRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public MediaModel createMedia(MediaModel media){
        if(media.getMediaType() == null){
            throw new RuntimeException("Preencha o tipo de mídia");
        }
        media.setMediaCreatedAt(LocalDateTime.now());
        return mediaRepository.save(media);
    }

    public List<MediaModel> getAllMedia(){
        return mediaRepository.findAll();
    }

    public MediaModel getMediaById(UUID id){
        return mediaRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Media not found"));
    }

    public MediaModel updateMedia(UUID id, MediaModel updatedMedia){
        MediaModel media = getMediaById(id);

        if(updatedMedia.getMediaTitle() != null) {
            media.setMediaTitle(updatedMedia.getMediaTitle());
        }
        if(updatedMedia.getMediaDescription() != null) {
            media.setMediaDescription(updatedMedia.getMediaDescription());
        }
        if(updatedMedia.getMediaType() != null){
            media.setMediaType(updatedMedia.getMediaType());
        }
        if(updatedMedia.getMediaUrl() != null) {
            media.setMediaUrl(updatedMedia.getMediaUrl());
        }

        return mediaRepository.save(media);
    }

    public List<MediaModel> getMediaByUser(UUID userId) {
        return mediaRepository.findByUser_UserId(userId);
    }

    public void deleteMedia(UUID id){
        mediaRepository.deleteById(id);
    }


}
