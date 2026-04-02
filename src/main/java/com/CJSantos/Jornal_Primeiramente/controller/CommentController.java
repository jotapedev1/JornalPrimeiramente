package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.CommentModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.service.CommentService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public CommentModel createComment(@RequestBody CommentModel comment){
        return commentService.createComment(comment);
    }

    @GetMapping
    public List<CommentModel> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public CommentModel  getCommentById(@PathVariable UUID id){
        return commentService.getCommentById(id);
    }

    @GetMapping("/user-comment/{userId}")
    public List<CommentModel> getCommentByUser(@PathVariable UUID userId){
        return commentService.getCommentByUser(userId);
    }

    @GetMapping("media-comment/{mediaId}")
    public List<CommentModel> getCommentByMedia(@PathVariable UUID mediaId){
        return commentService.getCommentByMedia(mediaId);
    }

    @PutMapping("/{id}")
    public CommentModel updateComment(@PathVariable UUID id, @RequestBody CommentModel updatedComment) {
        return commentService.updateComment(id, updatedComment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable UUID id) {
        commentService.deleteComment(id);
    }

}
