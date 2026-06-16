package com.CJSantos.Jornal_Primeiramente.repository;

import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.SaveModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SaveRepository extends JpaRepository<SaveModel, UUID> {
    Optional<SaveModel> findBySaveUserAndSaveMedia(UserModel user, MediaModel media);
    boolean existsBySaveUser_UserIdAndSaveMedia_MediaId(
            UUID userId,
            UUID mediaId
    );
    List<SaveModel> findBySaveUser_UserId(UUID userId);
}
