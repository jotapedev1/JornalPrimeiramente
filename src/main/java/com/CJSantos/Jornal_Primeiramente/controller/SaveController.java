package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.SaveModel;
import com.CJSantos.Jornal_Primeiramente.service.SaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/save")
@RequiredArgsConstructor
public class SaveController {

    private final SaveService saveService;

    @PostMapping("/{mediaId}/save")
    public ResponseEntity<String> toggleSave(
            @PathVariable UUID mediaId,
            @RequestParam UUID userId
    ) {

        boolean saved = saveService.toggleSave(userId, mediaId);

        if (saved) {
            return ResponseEntity.ok(Map.of("saved", saved).toString());
        } else {
            return ResponseEntity.ok(Map.of("saved", saved).toString());
        }
    }
}