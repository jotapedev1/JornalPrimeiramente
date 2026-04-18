package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.dto.CommentRequest;
import com.CJSantos.Jornal_Primeiramente.model.CommentModel;
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
    public ResponseEntity<CommentModel> createComment(
            @PathVariable UUID mediaId,
            @RequestParam UUID userId,
            @RequestBody CommentRequest request
    ) {
        CommentModel comment = commentService.createComment(
                userId,
                mediaId,
                request.getContent()
        );

        return ResponseEntity.ok(comment);
    }
    @GetMapping("/{mediaId}/comments")
    public ResponseEntity<List<CommentModel>> getComments(
            @PathVariable UUID mediaId
    ) {
        return ResponseEntity.ok(commentService.getComments(mediaId));
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<String> deleteComment(
            @PathVariable UUID commentId, UUID userID
    ) {
        commentService.deleteComment(commentId, userID);
        return ResponseEntity.ok("Comment deleted");
    }
}