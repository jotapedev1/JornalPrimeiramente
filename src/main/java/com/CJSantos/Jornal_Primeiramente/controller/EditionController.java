package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.utils.JwtUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/editions")
public class EditionController {

    @Autowired
    private JwtUtil jwtUtil;

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

    @PostMapping("/announcement")
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