package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.dto.ChangePasswordRequest;
import com.CJSantos.Jornal_Primeiramente.dto.ProfileUpdateRequest;
import com.CJSantos.Jornal_Primeiramente.model.LikeModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.Role;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.LikeRepository;
import com.CJSantos.Jornal_Primeiramente.service.MediaService;
import com.CJSantos.Jornal_Primeiramente.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private MediaService mediaService;
    @Autowired
    private LikeRepository likeRepository;

    // ===== PROFILE OPERATIONS (User can access their own profile) =====

    /**
     * Get current authenticated user's profile
     * Access: Any authenticated user
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getCurrentUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            UserModel user = userService.getUserByEmail(userDetails.getUsername());

            Map<String, Object> profile = new HashMap<>();
            profile.put("userId", user.getUserId());
            profile.put("userName", user.getUserName());
            profile.put("userEmail", user.getUserEmail());
            profile.put("userRole", user.getUserRole());
            profile.put("userCreatedAt", user.getUserCreatedAt());

            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

    /**
     * Update current authenticated user's profile
     * Access: Any authenticated user (can only update their own profile)
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateCurrentUserProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileUpdateRequest updateRequest) {
        try {
            UserModel user = userService.getUserByEmail(userDetails.getUsername());

            // Only update allowed fields
            if (updateRequest.getUserName() != null) {
                user.setUserName(updateRequest.getUserName());
            }
            if (updateRequest.getUserEmail() != null) {
                // Check if email is already taken by another user
                try {
                    UserModel existingUser = userService.getUserByEmail(updateRequest.getUserEmail());
                    if (!existingUser.getUserId().equals(user.getUserId())) {
                        return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
                    }
                } catch (RuntimeException e) {
                    // Email not found, safe to update
                }
                user.setUserEmail(updateRequest.getUserEmail());
            }

            UserModel updatedUser = userService.updateUser(user.getUserId(), user);

            Map<String, Object> response = new HashMap<>();
            response.put("userId", updatedUser.getUserId());
            response.put("userName", updatedUser.getUserName());
            response.put("userEmail", updatedUser.getUserEmail());
            response.put("message", "Profile updated successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Delete current authenticated user's account
     * Access: Any authenticated user (can only delete their own account)
     */
    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteCurrentUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            UserModel user = userService.getUserByEmail(userDetails.getUsername());
            userService.deleteUser(user.getUserId());
            return ResponseEntity.ok(Map.of("message", "Account deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<?> getUserPosts(@PathVariable UUID userId) {
        try {
            List<MediaModel> medias = mediaService.getMediaByUser(userId);
            return ResponseEntity.ok(medias);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "Usuário não encontrado"));
        }
    }

    @GetMapping("/{userId}/likes")
    public ResponseEntity<?> getUserLikes(@PathVariable UUID userId) {
        try {
            List<LikeModel> likes = likeRepository.findByLikeUser_UserId(userId);
            List<Map<String, Object>> result = likes.stream()
                    .map(like -> {
                        Map<String, Object> m = new java.util.HashMap<>();
                        m.put("mediaId", like.getLikeMedia().getMediaId());
                        m.put("title", like.getLikeMedia().getMediaTitle());
                        m.put("createdAt", like.getLikeCreatedAt());
                        return m;
                    })
                    .toList();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "Erro ao buscar curtidas"));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ChangePasswordRequest request) {
        try {
            userService.changePassword(
                    userDetails.getUsername(),
                    request.getCurrentPassword(),
                    request.getNewPassword()
            );
            return ResponseEntity.ok(Map.of("message", "Senha alterada com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}