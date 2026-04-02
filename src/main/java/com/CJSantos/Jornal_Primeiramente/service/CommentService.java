package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.CommentModel;
import com.CJSantos.Jornal_Primeiramente.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public CommentModel createComment(CommentModel comment) {
        if (comment.getCommentContent() == null || comment.getCommentContent().isEmpty()) {
            throw new RuntimeException("Invalid comment");
        }

        return commentRepository.save(comment);
    }

    public CommentModel getCommentById(UUID commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    public List<CommentModel> getAllComments() {
        return commentRepository.findAll();
    }

    public CommentModel updateComment(UUID commentId, CommentModel updatedComment) {
        CommentModel comment = getCommentById(commentId);

        if (updatedComment.getCommentContent() != null) {
            comment.setCommentContent(updatedComment.getCommentContent());
        }

        return commentRepository.save(comment);
    }

    public void deleteComment(UUID commentId) {
        getCommentById(commentId);
        commentRepository.deleteById(commentId);
    }

    public List<CommentModel> getCommentByMedia(UUID mediaId) {
        return commentRepository.getMediaById(mediaId);
    }

    public List<CommentModel> getCommentByUser(UUID userId) {
        return commentRepository.getUserById(userId);
    }
}