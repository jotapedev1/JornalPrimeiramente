package com.CJSantos.Jornal_Primeiramente.repository;

import com.CJSantos.Jornal_Primeiramente.model.Priority;
import com.CJSantos.Jornal_Primeiramente.model.WarningModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface WarningRepository extends JpaRepository<WarningModel, UUID> {

    // Buscar avisos por prioridade
    List<WarningModel> findByPriority(Priority priority);

    // Buscar avisos não expirados (data de expiração maior que hoje ou null)
    @Query("SELECT w FROM WarningModel w WHERE w.expirationDate IS NULL OR w.expirationDate >= :today")
    List<WarningModel> findActiveWarnings(@Param("today") LocalDate today);

    // Buscar avisos por prioridade e não expirados
    @Query("SELECT w FROM WarningModel w WHERE w.priority = :priority AND (w.expirationDate IS NULL OR w.expirationDate >= :today)")
    List<WarningModel> findActiveWarningsByPriority(@Param("priority") Priority priority, @Param("today") LocalDate today);

}