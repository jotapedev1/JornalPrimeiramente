package com.CJSantos.Jornal_Primeiramente.repository;

import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.SaveModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SaveRepository extends JpaRepository<SaveModel, UUID> {
    List<SaveModel> getAllSavedByUser(UUID userId, UUID mediaId);

    Optional<SaveModel> findBySaveUserAndSaveMedia(UserModel user, MediaModel media);
}
