package com.CJSantos.Jornal_Primeiramente.repository;

import com.CJSantos.Jornal_Primeiramente.model.LikeModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface LikeRepository extends JpaRepository<LikeModel, UUID> {
    Optional<LikeModel> findByLikeUserAndLikeMedia(UserModel user, MediaModel media);
}
