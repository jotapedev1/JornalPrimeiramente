package com.CJSantos.Jornal_Primeiramente.repository;

import com.CJSantos.Jornal_Primeiramente.model.EditionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EditionRepository extends JpaRepository<EditionModel, UUID> {

    Optional<EditionModel> findByEditionNumber(String editionNumber);

    List<EditionModel> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    //TODO REMOVE THIS FUNCTION
    List<EditionModel> findByIsSpecialEdition(boolean isSpecial);

    @Query(value = "SELECT * FROM edition ORDER BY created_at DESC LIMIT :limit", nativeQuery = true)
    List<EditionModel> findTopNOrderByCreatedAtDesc(@Param("limit") int limit);

    //TODO REMOVE THIS FUNCTION
    boolean existsByEditionNumber(String editionNumber);
}