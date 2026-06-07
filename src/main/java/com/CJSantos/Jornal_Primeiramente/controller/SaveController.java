package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.SaveModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
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

    @PostMapping("/{mediaId}")
    public ResponseEntity<String> toggleSave(
            @PathVariable UUID mediaId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UserModel currentUser = userService.getUserByEmail(userDetails.getUsername());
        boolean saved = saveService.toggleSave(currentUser.getUserId(), mediaId);
        return ResponseEntity.ok(Map.of("saved", saved).toString());
    }
}