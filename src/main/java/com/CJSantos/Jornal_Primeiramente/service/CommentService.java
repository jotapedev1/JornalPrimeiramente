package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.CommentModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
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

    public CommentModel createComment(UUID userId, UUID mediaId, String content) {

        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        MediaModel media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Mídia não encontrada"));

        CommentModel comment = new CommentModel();
        comment.setCommentUser(user);
        comment.setCommentMedia(media);
        comment.setCommentContent(content);
        comment.setCommentCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public List<CommentModel> getComments(UUID mediaId) {
        return commentRepository.findByCommentMedia_MediaId(mediaId);
    }

    public void deleteComment(UUID commentId, UUID userId) {

        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getCommentUser().getUserId().equals(userId)) {
            throw new RuntimeException("You cannot delete this comment");
        }

        commentRepository.delete(comment);
    }
}