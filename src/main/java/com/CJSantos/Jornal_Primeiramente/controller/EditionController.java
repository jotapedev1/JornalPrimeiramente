package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.dto.AnnouncementRequest;
import com.CJSantos.Jornal_Primeiramente.dto.EditionCreateRequest;
import com.CJSantos.Jornal_Primeiramente.dto.MediaCreateRequest;
import com.CJSantos.Jornal_Primeiramente.model.EditionModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import com.CJSantos.Jornal_Primeiramente.service.EditionService;
import com.CJSantos.Jornal_Primeiramente.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/edition")
public class EditionController{

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EditionService editionService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createEdition(
            @RequestPart("edition") String editionJson,
            @RequestPart(value = "files", required = false)
            List<MultipartFile> files,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            String token = authHeader.substring(7);

            ObjectMapper mapper = new ObjectMapper();

            // ANTES: EditionModel edition = mapper.readValue(editionJson, EditionModel.class);
            EditionCreateRequest request = mapper.readValue(editionJson, EditionCreateRequest.class);

            String email = jwtUtil.getUsernameFromToken(token);
            UserModel user = userRepository.findByUserEmail(email);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Usuário não encontrado"));
            }

            // Monta a entidade manualmente a partir do DTO
            EditionModel edition = new EditionModel();
            edition.setTitle(request.getTitle());
            edition.setEditionNumber(request.getEditionNumber());
            edition.setPublicationDate(request.getPublicationDate());

            List<MediaModel> mediaList = new java.util.ArrayList<>();
            if (request.getMedia() != null) {
                for (int i = 0; i < request.getMedia().size(); i++) {
                    MediaCreateRequest m = request.getMedia().get(i);
                    MediaModel media = new MediaModel();
                    media.setMediaTitle(m.getMediaTitle());
                    media.setMediaDescription(m.getMediaDescription());
                    media.setMediaAuthor(m.getMediaAuthor());
                    media.setMediaType(m.getMediaType());
                    media.setMediaUrl("pending"); // obrigatório no model, ajuste depois com o arquivo

                    if (files != null && i < files.size()) {
                        MultipartFile file = files.get(i);
                        media.setMediaFile(file.getBytes());
                        media.setMediaFileName(file.getOriginalFilename());
                        media.setMediaFileType(file.getContentType());
                        media.setMediaFileSize(file.getSize());
                    }

                    mediaList.add(media);
                }
            }
            edition.setMedia(mediaList);

            EditionModel savedEdition = editionService.createEdition(edition, user);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "message", "Edição criada com sucesso",
                            "editionId", savedEdition.getEditionId(),
                            "mediaCount", savedEdition.getMedia().size()
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create-announcement")
    public ResponseEntity<?> createAnnouncement(
            @RequestBody AnnouncementRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.substring(7);
        // Announcement creation logic here

        return ResponseEntity.ok(Map.of(
                "message", "Announcement published successfully"
        ));
    }

    @GetMapping
    public List<EditionModel> getAllEditions() {
        return editionService.getAllEditions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEditionById(@PathVariable UUID id) {
        try {
            EditionModel edition = editionService.getEditionById(id);
            return ResponseEntity.ok(edition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/number/{editionNumber}")
    public ResponseEntity<?> getEditionByNumber(@PathVariable String editionNumber) {
        try {
            EditionModel edition = editionService.getEditionByNumber(editionNumber);
            return ResponseEntity.ok(edition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEdition(@PathVariable UUID id, @Valid @RequestBody EditionModel edition) {
        try {
            EditionModel updatedEdition = editionService.updateEdition(id, edition);
            return ResponseEntity.ok(updatedEdition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEdition(@PathVariable UUID id) {
        try {
            editionService.deleteEdition(id);
            return ResponseEntity.ok(Map.of("message", "Edição deletada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

}
