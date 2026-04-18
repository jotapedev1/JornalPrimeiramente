package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.LikeModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.LikeRepository;
import com.CJSantos.Jornal_Primeiramente.repository.MediaRepository;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final MediaRepository mediaRepository;

    public boolean toggleLike(UUID userId, UUID mediaId) {

        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MediaModel media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Media not found"));

        Optional<LikeModel> existingLike =
                likeRepository.findByLikeUserAndLikeMedia(user, media);

        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            return false; // its NOT liked
        }

        LikeModel like = new LikeModel();
        like.setLikeUser(user);
        like.setLikeMedia(media);
        like.setLikeCreatedAt(LocalDateTime.now());

        likeRepository.save(like);

        return true; // its liked
    }
}