package com.CJSantos.Jornal_Primeiramente.repository;

import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MediaRepository extends JpaRepository<MediaModel, UUID> {
    List<MediaModel> findByUser_UserId(UUID userId);
}
