package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.SaveModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.service.MediaService;
import com.CJSantos.Jornal_Primeiramente.service.SaveService;
import com.CJSantos.Jornal_Primeiramente.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/save")
@RequiredArgsConstructor
public class SaveController {

    private final SaveService saveService;
    private final UserService userService;
    private final MediaService mediaService;

    @PostMapping("/{mediaId}")
    public ResponseEntity<?> toggleSave(
            @PathVariable UUID mediaId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Usuário não autenticado"));
            }

            UserModel currentUser =
                    userService.getUserByEmail(userDetails.getUsername());

            boolean saved = saveService.toggleSave(
                    currentUser.getUserId(),
                    mediaId
            );


            return ResponseEntity.ok(Map.of("saved", saved));

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{mediaId}")
    public ResponseEntity<?> checkSave(
            @PathVariable UUID mediaId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Usuário não autenticado"));
            }

            UserModel currentUser =
                    userService.getUserByEmail(userDetails.getUsername());

            boolean saved = saveService.isSaved(
                    currentUser.getUserId(),
                    mediaId
            );

            return ResponseEntity.ok(Map.of("saved", saved));

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getSavedMedia(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UserModel user =
                userService.getUserByEmail(userDetails.getUsername());

        return ResponseEntity.ok(
                saveService.getSavedMedia(user.getUserId())
        );
    }
}