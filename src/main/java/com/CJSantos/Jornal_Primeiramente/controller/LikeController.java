package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.LikeModel;
import com.CJSantos.Jornal_Primeiramente.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/like")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{mediaId}/like")
    public ResponseEntity<String> toggleLike(
            @PathVariable UUID mediaId,
            @RequestParam UUID userId
    ) {

        boolean liked = likeService.toggleLike(userId, mediaId);

        if (liked) {
            return ResponseEntity.ok(Map.of("liked", liked).toString());
        } else {
            return ResponseEntity.ok(Map.of("liked", liked).toString());
        }
    }
}