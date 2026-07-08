package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.dto.MediaRequest;
import com.CJSantos.Jornal_Primeiramente.model.Media;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.MediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final MediaRepository mediaRepository;
    private final SaveService saveService;
    private final CoverGeneratorService coverGeneratorService;

    public MediaModel createMediaWithFile(
            MediaModel media,
            MultipartFile file,
            MultipartFile cover,
            UserModel user
    ) throws IOException {

        validateMedia(media);

        if (file != null && !file.isEmpty()) {
            validateFile(file, media.getMediaType());

            byte[] fileBytes = file.getBytes();
            media.setMediaFile(fileBytes);
            media.setMediaFileName(file.getOriginalFilename());
            media.setMediaFileType(file.getContentType());
            media.setMediaFileSize(file.getSize());
        }

        applyCover(media, cover, file);

        media.setUser(user);
        media.setMediaCreatedAt(LocalDateTime.now());

        return mediaRepository.save(media);
    }

    public MediaModel createMediaWithContent(
            MediaModel media,
            String content,
            MultipartFile cover,
            UserModel user
    ) throws IOException {
        validateMedia(media);

        if (media.getMediaType() != Media.POETRY && media.getMediaType() != Media.TEXT) {
            throw new RuntimeException("Este método é apenas para POESIA e TEXTO");
        }

        media.setMediaContent(content);
        media.setMediaFileName(null);
        media.setMediaFile(null);
        media.setMediaFileType(null);
        media.setMediaFileSize(null);

        applyCover(media, cover, null);

        media.setUser(user);
        media.setMediaCreatedAt(LocalDateTime.now());

        return mediaRepository.save(media);
    }

    public byte[] getMediaCover(UUID mediaId) {
        MediaModel media = getMediaById(mediaId);
        return media.getMediaCover();
    }

    public MediaModel createMedia(MediaModel media) {
        validateMedia(media);

        if ((media.getMediaType() == Media.POETRY || media.getMediaType() == Media.TEXT)
                && (media.getMediaContent() == null || media.getMediaContent().isEmpty())) {
            throw new RuntimeException("Conteúdo obrigatório para POESIA e TEXTO");
        }

        if (media.getMediaFileName() == null || media.getMediaFileName().isBlank()) {
            media.setMediaFileName("sem-arquivo");
        }

        // Endpoint usado também para AVISO (publish) — sem capa enviada, gera card de texto
        if (media.getMediaCover() == null) {
            try {
                byte[] generated = coverGeneratorService.generateFromText(
                        media.getMediaTitle(), media.getMediaDescription(), media.getMediaType());
                media.setMediaCover(generated);
                media.setMediaCoverGenerated(true);
            } catch (IOException e) {
                // Falha na geração não deve impedir a publicação — card fica sem capa
            }
        }

        media.setMediaCreatedAt(LocalDateTime.now());
        return mediaRepository.save(media);
    }

    public byte[] getMediaFile(UUID mediaId) {
        MediaModel media = getMediaById(mediaId);

        if (media.getMediaFile() == null) {
            throw new RuntimeException("Nenhum arquivo associado a esta mídia");
        }

        return media.getMediaFile();
    }

    public String getMediaContent(UUID mediaId) {
        MediaModel media = getMediaById(mediaId);

        if (media.getMediaContent() == null || media.getMediaContent().isEmpty()) {
            throw new RuntimeException("Nenhum conteúdo associado a esta mídia");
        }

        return media.getMediaContent();
    }

    /**
     * Regra da capa híbrida:
     * 1. Se o autor enviou uma capa própria -> usa ela.
     * 2. Se for ARTICLE (PDF) -> renderiza a primeira página.
     * 3. Se for DRAWING (imagem já enviada como arquivo) -> usa a própria imagem, ajustada ao card.
     * 4. Caso contrário (TEXT, POETRY, WARNING) -> gera um card com título + trecho.
     * Qualquer falha na geração automática não deve travar a criação da mídia.
     */
    private void applyCover(MediaModel media, MultipartFile cover, MultipartFile file) {
        if (cover != null && !cover.isEmpty()) {
            try {
                validateCover(cover);
                media.setMediaCover(cover.getBytes());
                media.setMediaCoverGenerated(false);
                return;
            } catch (IOException e) {
                throw new RuntimeException("Erro ao processar capa: " + e.getMessage());
            }
        }

        try {
            byte[] generated = switch (media.getMediaType()) {
                case ARTICLE -> file != null && !file.isEmpty()
                        ? coverGeneratorService.generateFromPdf(file.getBytes())
                        : null;
                case DRAWING -> file != null && !file.isEmpty()
                        ? coverGeneratorService.generateFromImage(file.getBytes())
                        : null;
                default -> coverGeneratorService.generateFromText(
                        media.getMediaTitle(), media.getMediaContent(), media.getMediaType());
            };

            if (generated != null) {
                media.setMediaCover(generated);
                media.setMediaCoverGenerated(true);
            }
        } catch (IOException e) {
            // Geração automática é best-effort: card sem capa não deve bloquear a publicação
        }
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
        if (updatedMedia.getMediaContent() != null) {
            media.setMediaContent(updatedMedia.getMediaContent());
        }

        return mediaRepository.save(media);
    }

    public List<MediaModel> getMediaByUser(UUID userId) {
        return mediaRepository.findByUser_UserId(userId);
    }

    public void deleteMedia(UUID id) {
        mediaRepository.deleteById(id);
    }

    public MediaRequest toDTO(MediaModel media, UUID userId) {
        MediaRequest dto = new MediaRequest();
        dto.setMediaId(media.getMediaId());
        dto.setMediaTitle(media.getMediaTitle());
        dto.setMediaDescription(media.getMediaDescription());
        dto.setMediaAuthor(media.getMediaAuthor());
        dto.setMediaUrl(media.getMediaUrl());
        dto.setMediaType(media.getMediaType());
        dto.setMediaContent(media.getMediaContent());
        dto.setHasCover(media.getMediaCover() != null && media.getMediaCover().length > 0);
        dto.setCoverGenerated(media.isMediaCoverGenerated());
        return dto;
    }

    private void validateMedia(MediaModel media) {
        if (media.getMediaType() == null) {
            throw new RuntimeException("Preencha o tipo de mídia");
        }
    }

    private void validateFile(MultipartFile file, Media mediaType) {
        String contentType = file.getContentType();
        long fileSize = file.getSize();

        if (fileSize > 15 * 1024 * 1024) {
            throw new RuntimeException("Arquivo muito grande. Limite de 15MB");
        }

        switch (mediaType) {
            case ARTICLE:
                if (!"application/pdf".equals(contentType)) {
                    throw new RuntimeException("ARTIGO deve ser um arquivo PDF");
                }
                break;
            case DRAWING:
                if (contentType == null || !contentType.startsWith("image/")) {
                    throw new RuntimeException("ILUSTRAÇÃO deve ser uma imagem (PNG ou JPG)");
                }
                if (!"image/png".equals(contentType) && !"image/jpeg".equals(contentType)) {
                    throw new RuntimeException("ILUSTRAÇÃO deve ser PNG ou JPG");
                }
                break;
            default:
                throw new RuntimeException("Este tipo de mídia não aceita arquivos: " + mediaType);
        }
    }

    private void validateCover(MultipartFile cover) {
        String contentType = cover.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("A capa deve ser uma imagem (PNG, JPG, JPEG)");
        }

        if (!"image/png".equals(contentType) &&
                !"image/jpeg".equals(contentType) &&
                !"image/jpg".equals(contentType)) {
            throw new RuntimeException("A capa deve ser PNG, JPG ou JPEG");
        }

        if (cover.getSize() > 5 * 1024 * 1024) {
            throw new RuntimeException("A capa deve ter no máximo 5MB");
        }
    }
}