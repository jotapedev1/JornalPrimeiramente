package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.dto.CommentRequest;
import com.CJSantos.Jornal_Primeiramente.dto.CommentResponse;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.service.CommentService;
import com.CJSantos.Jornal_Primeiramente.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final UserService userService;

    @PostMapping("/{mediaId}")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable UUID mediaId,
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UserModel currentUser = userService.getUserByEmail(userDetails.getUsername());
        CommentResponse comment = commentService.createComment(currentUser.getUserId(), mediaId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }


    @GetMapping("/{mediaId}")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable UUID mediaId) {
        List<CommentResponse> comments = commentService.getComments(mediaId);
        return ResponseEntity.ok(commentService.getComments(mediaId));
    }

    @DeleteMapping("/{mediaId}/comment/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable UUID mediaId,
            @PathVariable UUID commentId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            UserModel currentUser = userService.getUserByEmail(userDetails.getUsername());
            commentService.deleteComment(mediaId, commentId, currentUser);
            return ResponseEntity.ok(Map.of(
                    "message", "Comment deleted successfully",
                    "commentId", commentId,
                    "mediaId", mediaId
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}