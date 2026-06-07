package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.LikeModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.service.LikeService;
import com.CJSantos.Jornal_Primeiramente.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final UserService userService;


    @PostMapping("/{mediaId}")
    public ResponseEntity<String> toggleLike(
            @PathVariable UUID mediaId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UserModel currentUser = userService.getUserByEmail(userDetails.getUsername());
        boolean liked = likeService.toggleLike(currentUser.getUserId(), mediaId);
        return ResponseEntity.ok(Map.of("liked", liked).toString());
    }
}