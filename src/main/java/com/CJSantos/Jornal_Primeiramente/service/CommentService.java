package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.dto.CommentRequest;
import com.CJSantos.Jornal_Primeiramente.dto.CommentResponse;
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

    public CommentResponse createComment(UUID userId, UUID mediaId, CommentRequest request) {
        //search user by id
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        //search media by id
        MediaModel media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Media not found"));
        //create new comment
        CommentModel comment = new CommentModel();
        comment.setCommentUser(user);
        comment.setCommentMedia(media);
        comment.setCommentContent(request.getContent());
        comment.setCommentCreatedAt(LocalDateTime.now());

        commentRepository.save(comment);

        return new CommentResponse(
                comment.getCommentId(),
                comment.getCommentContent(),
                user.getUserId(),
                media.getMediaId()
        );
    }

    public List<CommentResponse> getComments(UUID mediaId) {
        List<CommentModel> comments = commentRepository.findByCommentMedia_MediaId(mediaId);
        //list all comments
        return comments.stream()
                .map(comment -> new CommentResponse(
                        comment.getCommentId(),
                        comment.getCommentContent(),
                        comment.getCommentUser().getUserId(),
                        comment.getCommentMedia().getMediaId()
                ))
                .toList();
    }

    public void deleteComment(UUID commentId, UUID userId) {
        //search comment by id
        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        //if userId not equal the created userId you cant delete that comment
        if (!comment.getCommentUser().getUserId().equals(userId)) {
            throw new RuntimeException("You cannot delete this comment");
        }

        commentRepository.delete(comment);
    }
}