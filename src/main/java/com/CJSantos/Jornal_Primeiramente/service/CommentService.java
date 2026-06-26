package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.dto.CommentRequest;
import com.CJSantos.Jornal_Primeiramente.dto.CommentResponse;
import com.CJSantos.Jornal_Primeiramente.model.CommentModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.Role;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.CommentRepository;
import com.CJSantos.Jornal_Primeiramente.repository.MediaRepository;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final MediaRepository mediaRepository;

    private CommentResponse toResponse(CommentModel comment) {
        return new CommentResponse(
                comment.getCommentId(),
                comment.getCommentContent(),
                comment.getCommentUser().getUserId(),
                comment.getCommentUser().getUserName(),
                comment.getCommentMedia().getMediaId(),
                comment.getCommentCreatedAt()
        );
    }

    public CommentResponse createComment(UUID userId, UUID mediaId, CommentRequest request) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MediaModel media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Media not found"));

        CommentModel comment = new CommentModel();
        comment.setCommentUser(user);
        comment.setCommentMedia(media);
        comment.setCommentContent(request.getContent());
        comment.setCommentCreatedAt(LocalDateTime.now());

        commentRepository.save(comment);

        return toResponse(comment);
    }

    public List<CommentResponse> getComments(UUID mediaId) {
        return commentRepository.findByCommentMedia_MediaId(mediaId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public void deleteComment(UUID mediaId, UUID commentId, UserModel currentUser) {
        mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Media not found"));

        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getCommentMedia().getMediaId().equals(mediaId)) {
            throw new RuntimeException("Comment does not belong to this media");
        }

        boolean isAuthor = comment.getCommentUser().getUserId().equals(currentUser.getUserId());
        boolean isAdmin = currentUser.getUserRole() == Role.ADMIN;

        if (!isAuthor && !isAdmin) {
            throw new RuntimeException("You don't have permission to delete this comment");
        }

        commentRepository.delete(comment);
    }
}