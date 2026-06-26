package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.EditionModel;
import com.CJSantos.Jornal_Primeiramente.model.Media;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.service.EditionService;
import com.CJSantos.Jornal_Primeiramente.service.MediaService;
import com.CJSantos.Jornal_Primeiramente.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/media")
public class MediaController {

    private final MediaService mediaService;
    private final EditionService editionService;
    private final UserService userService;

    public MediaController(MediaService mediaService, EditionService editionService, UserService userService) {
        this.mediaService = mediaService;
        this.editionService = editionService;
        this.userService = userService;
    }

    // Criar mídia com arquivo PDF
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createMediaWithFile(
            @RequestPart("media") String mediaJson,
            @RequestPart(value = "file", required = false)
            MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        try {

            ObjectMapper mapper = new ObjectMapper();

            MediaModel media =
                    mapper.readValue(mediaJson, MediaModel.class);

            UserModel author =
                    userService.getUserByEmail(userDetails.getUsername());

            media.setUser(author);

            MediaModel savedMedia =
                    mediaService.createMediaWithFile(media, file, author);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "message", "Mídia criada com sucesso",
                    "mediaId", savedMedia.getMediaId(),
                    "fileName", savedMedia.getMediaFileName(),
                    "fileSize", savedMedia.getMediaFileSize()
            ));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Download do arquivo PDF
    @GetMapping("/{mediaId}/download")
    public ResponseEntity<byte[]> downloadMediaFile(@PathVariable UUID mediaId) {
        try {
            MediaModel media = mediaService.getMediaById(mediaId);
            byte[] fileContent = mediaService.getMediaFile(mediaId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", media.getMediaFileName());
            headers.setContentLength(media.getMediaFileSize());

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(fileContent);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Visualizar PDF no navegador (inline)
    @GetMapping("/{mediaId}/view")
    public ResponseEntity<byte[]> viewMediaFile(@PathVariable UUID mediaId) {
        try {
            MediaModel media = mediaService.getMediaById(mediaId);
            byte[] fileContent = mediaService.getMediaFile(mediaId);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(fileContent.length)
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + media.getMediaFileName() + "\""
                    )
                    .body(fileContent);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Criar mídia sem arquivo (texto)
    @PostMapping
    public MediaModel createMedia(@Valid @RequestBody MediaModel media) {
        return mediaService.createMedia(media);
    }

    @GetMapping
    public List<MediaModel> getAllMedia() {
        return mediaService.getAllMedia();
    }

    @GetMapping("/{id}")
    public MediaModel getMediaById(@PathVariable UUID id) {
        return mediaService.getMediaById(id);
    }

    @GetMapping("/user/{userId}")
    public List<MediaModel> getMediaByUser(@PathVariable UUID userId) {
        return mediaService.getMediaByUser(userId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public MediaModel updateMedia(@PathVariable UUID id, @Valid @RequestBody MediaModel media) {
        return mediaService.updateMedia(id, media);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteMediaById(@PathVariable UUID id) {
        mediaService.deleteMedia(id);
    }

    // Endpoint para publicar edição ou aviso
    @PostMapping("/publish")
    public ResponseEntity<?> publish(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserDetails userDetails) {

        try {
            String type = (String) request.get("type");
            UserModel author = userService.getUserByEmail(userDetails.getUsername());

            if ("aviso".equals(type)) {
                // Criar aviso
                MediaModel aviso = new MediaModel();
                aviso.setMediaTitle((String) request.get("title"));
                aviso.setMediaDescription((String) request.get("content"));
                aviso.setMediaType(Media.WARNING);
                aviso.setUser(author);

                String priority = (String) request.get("priority");
                String expiryDate = (String) request.get("expiryDate");
                aviso.setMediaUrl("priority=" + priority + "&expiry=" + expiryDate);

                MediaModel saved = mediaService.createMedia(aviso);

                return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                        "message", "Aviso publicado com sucesso",
                        "mediaId", saved.getMediaId()
                ));

            } else if ("edicao".equals(type)) {

                EditionModel edition = new EditionModel();
                edition.setTitle((String) request.get("title"));
                edition.setEditionNumber((String) request.get("editionNumber"));
                edition.setPublicationDate((String) request.get("publicationDate"));

                @SuppressWarnings("unchecked")
                List<String> mediaIds =
                        (List<String>) request.get("mediaIds");

                if (mediaIds == null || mediaIds.isEmpty()) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("error", "Nenhum artigo enviado"));
                }

                for (String mediaId : mediaIds) {
                    MediaModel media =
                            mediaService.getMediaById(UUID.fromString(mediaId));

                    edition.addMedia(media);
                }

                EditionModel saved = editionService.createEdition(edition, author);

                return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                        "message",
                        "Edição publicada com " + saved.getMedia().size() + " artigo(s)",
                        "editionId",
                        saved.getEditionId()
                ));
            }

            return ResponseEntity.badRequest().body(Map.of("error", "Tipo de mídia inválido"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}