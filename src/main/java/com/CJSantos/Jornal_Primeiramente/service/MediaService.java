package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.repository.MediaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    // Criar mídia com arquivo PDF
    public MediaModel createMediaWithFile(MediaModel media, MultipartFile file) throws IOException {
        if (media.getMediaType() == null) {
            throw new RuntimeException("Preencha o tipo de mídia");
        }

        if (file != null && !file.isEmpty()) {
            if (!file.getContentType().equals("application/pdf")) {
                throw new RuntimeException("Apenas arquivos PDF são permitidos");
            }
            if (file.getSize() > 15 * 1024 * 1024) {
                throw new RuntimeException("Arquivo muito grande. Limite de 15MB");
            }
            // Para byte[] - direto, sem SerialBlob
            media.setMediaFile(file.getBytes());
            media.setMediaFileName(file.getOriginalFilename());
            media.setMediaFileType(file.getContentType());
            media.setMediaFileSize(file.getSize());
        }

        media.setMediaCreatedAt(LocalDateTime.now());
        return mediaRepository.save(media);
    }

    // Buscar arquivo de uma mídia
    public byte[] getMediaFile(UUID mediaId) {
        MediaModel media = getMediaById(mediaId);
        byte[] file = media.getMediaFile();

        if (file == null) {
            throw new RuntimeException("Nenhum arquivo associado a esta mídia");
        }

        return file;
    }

    // Criar mídia sem arquivo (para avisos ou textos simples)
    public MediaModel createMedia(MediaModel media) {
        if (media.getMediaType() == null) {
            throw new RuntimeException("Preencha o tipo de mídia");
        }
        media.setMediaCreatedAt(LocalDateTime.now());
        return mediaRepository.save(media);
    }

    public List<MediaModel> getAllMedia() {
        return mediaRepository.findAll();
    }

    public MediaModel getMediaById(UUID id) {
        return mediaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Media not found"));
    }

    public MediaModel updateMedia(UUID id, MediaModel updatedMedia) {
        MediaModel media = getMediaById(id);

        if (updatedMedia.getMediaTitle() != null) {
            media.setMediaTitle(updatedMedia.getMediaTitle());
        }
        if (updatedMedia.getMediaDescription() != null) {
            media.setMediaDescription(updatedMedia.getMediaDescription());
        }
        if (updatedMedia.getMediaType() != null) {
            media.setMediaType(updatedMedia.getMediaType());
        }
        if (updatedMedia.getMediaUrl() != null) {
            media.setMediaUrl(updatedMedia.getMediaUrl());
        }

        return mediaRepository.save(media);
    }

    public List<MediaModel> getMediaByUser(UUID userId) {
        return mediaRepository.findByUser_UserId(userId);
    }

    public void deleteMedia(UUID id) {
        mediaRepository.deleteById(id);
    }
}