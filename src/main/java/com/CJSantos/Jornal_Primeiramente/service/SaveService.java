package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.SaveModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.MediaRepository;
import com.CJSantos.Jornal_Primeiramente.repository.SaveRepository;
import com.CJSantos.Jornal_Primeiramente.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SaveService {

    private final SaveRepository saveRepository;
    private final UserRepository userRepository;
    private final MediaRepository mediaRepository;

    public boolean toggleSave(UUID userId, UUID mediaId) {

        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MediaModel media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Media not found"));

        Optional<SaveModel> existing =
                saveRepository.findBySaveUserAndSaveMedia(user, media);

        if (existing.isPresent()) {
            saveRepository.delete(existing.get());
            return false;
        }

        SaveModel save = new SaveModel();
        save.setSaveUser(user);
        save.setSaveMedia(media);
        save.setSaveCreatedAt(LocalDateTime.now());

        saveRepository.save(save);

        return true;
    }
}