package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.dto.CommentRequest;
import com.CJSantos.Jornal_Primeiramente.dto.CommentResponse;
import com.CJSantos.Jornal_Primeiramente.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{mediaId}/comment")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable UUID mediaId,
            @RequestParam UUID userId,
            @RequestBody CommentRequest request
    ) {
        CommentResponse response = commentService.createComment(userId, mediaId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{mediaId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable UUID mediaId) {
        return ResponseEntity.ok(commentService.getComments(mediaId));
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<String> deleteComment(
            @PathVariable UUID commentId,
            @RequestParam UUID userId
    ) {
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.ok("Comment deleted");
    }
}