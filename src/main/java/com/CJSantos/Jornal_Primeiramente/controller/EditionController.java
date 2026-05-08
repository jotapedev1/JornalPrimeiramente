package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.EditionModel;
import com.CJSantos.Jornal_Primeiramente.service.EditionService;
import com.CJSantos.Jornal_Primeiramente.utils.JwtUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/editions")
public class EditionController{

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EditionService editionService;

    @PostMapping("/create")
    public ResponseEntity<?> createEdition(
            @RequestBody EditionRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        // Extract token from header
        String token = authHeader.substring(7);

        // Verify if user is ADMIN
        if (!jwtUtil.isAdminFromToken(token)) {
            return ResponseEntity.status(403).body(Map.of(
                    "error", "Access denied. Only administrators can create editions."
            ));
        }

        // Here you would create the edition in your database
        // Edition creation logic here

        return ResponseEntity.ok(Map.of(
                "message", "Edition created successfully",
                "title", request.getTitle()
        ));
    }

    @PostMapping("/create-announcement")
    public ResponseEntity<?> createAnnouncement(
            @RequestBody AnnouncementRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.substring(7);

        if (!jwtUtil.isAdminFromToken(token)) {
            return ResponseEntity.status(403).body(Map.of(
                    "error", "Access denied. Only administrators can create announcements."
            ));
        }

        // Announcement creation logic here

        return ResponseEntity.ok(Map.of(
                "message", "Announcement published successfully"
        ));
    }

    @GetMapping("/edition")
    public List<EditionModel> getAllEditions() {
        return editionService.getAllEditions();
    }

    @GetMapping("/edition/{id}")
    public ResponseEntity<?> getEditionById(@PathVariable UUID id) {
        try {
            EditionModel edition = editionService.getEditionById(id);
            return ResponseEntity.ok(edition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/edition/number/{editionNumber}")
    public ResponseEntity<?> getEditionByNumber(@PathVariable String editionNumber) {
        try {
            EditionModel edition = editionService.getEditionByNumber(editionNumber);
            return ResponseEntity.ok(edition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/edition/{id}")
    public ResponseEntity<?> updateEdition(@PathVariable UUID id, @RequestBody EditionModel edition) {
        try {
            EditionModel updatedEdition = editionService.updateEdition(id, edition);
            return ResponseEntity.ok(updatedEdition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/edition/{id}")
    public ResponseEntity<?> deleteEdition(@PathVariable UUID id) {
        try {
            editionService.deleteEdition(id);
            return ResponseEntity.ok(Map.of("message", "Edição deletada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

}

// DTOs
@Data
class EditionRequest {
    private String title;
    private String content;
}

@Data
class AnnouncementRequest {
    private String message;
    private String priority;
}