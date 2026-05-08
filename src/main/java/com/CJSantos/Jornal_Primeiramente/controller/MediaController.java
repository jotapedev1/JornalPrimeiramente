package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.EditionModel;
import com.CJSantos.Jornal_Primeiramente.model.Media;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.service.EditionService;
import com.CJSantos.Jornal_Primeiramente.service.MediaService;
import com.CJSantos.Jornal_Primeiramente.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

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

    @PostMapping
    public MediaModel createMedia(@RequestBody MediaModel media) {
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

    @PutMapping("/{id}")
    public MediaModel updateMedia(@PathVariable UUID id, @RequestBody MediaModel media) {
        return mediaService.updateMedia(id, media);
    }

    @GetMapping("/user/{userId}")
    public List<MediaModel> getMediaByUser(@PathVariable UUID userId) {
        return mediaService.getMediaByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteMediaById(@PathVariable UUID id) {
        mediaService.deleteMedia(id);
    }

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
                aviso.setMediaType(com.CJSantos.Jornal_Primeiramente.model.Media.WARNING);
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
                // Criar edição
                EditionModel edition = new EditionModel();
                edition.setTitle((String) request.get("title"));
                edition.setEditionNumber((String) request.get("editionNumber"));
                edition.setPublicationDate((String) request.get("publicationDate"));
                edition.setIsSpecialEdition((Boolean) request.getOrDefault("isSpecialEdition", false));

                // Processar artigos
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> articlesData = (List<Map<String, Object>>) request.get("articles");

                for (Map<String, Object> articleData : articlesData) {
                    MediaModel article = new MediaModel();
                    article.setMediaTitle((String) articleData.get("title"));
                    article.setMediaDescription((String) articleData.get("content"));
                    article.setArticleAuthor((String) articleData.get("author"));
                    article.setArticleCategory((String) articleData.get("category"));
                    article.setMediaType(Media.ARTICLE);
                    article.setUser(author);

                    edition.addArticle(article);
                }

                EditionModel saved = editionService.createEdition(edition);

                return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                        "message", "Edição publicada com " + saved.getArticles().size() + " artigo(s)",
                        "editionId", saved.getEditionId()
                ));
            }

            return ResponseEntity.badRequest().body(Map.of("error", "Tipo de mídia inválido"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}