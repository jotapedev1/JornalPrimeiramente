package com.CJSantos.Jornal_Primeiramente.repository;

import com.CJSantos.Jornal_Primeiramente.model.SaveModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SaveRepository extends JpaRepository<SaveModel, UUID> {
}
