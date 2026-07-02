package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.Priority;
import com.CJSantos.Jornal_Primeiramente.model.WarningModel;
import com.CJSantos.Jornal_Primeiramente.repository.WarningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WarningService {

    private final WarningRepository warningRepository;

    @Transactional
    public WarningModel createWarning(WarningModel warning) {
        // Validar campos obrigatórios
        if (warning.getTitle() == null || warning.getTitle().trim().isEmpty()) {
            throw new RuntimeException("O título do aviso é obrigatório");
        }
        if (warning.getPriority() == null) {
            throw new RuntimeException("A prioridade do aviso é obrigatória");
        }

        // Gerar ID se não existir
        if (warning.getWarningId() == null) {
            warning.setWarningId(UUID.randomUUID());
        }

        return warningRepository.save(warning);
    }

    public List<WarningModel> getAllWarnings() {
        return warningRepository.findAll();
    }

    public List<WarningModel> getActiveWarnings() {
        return warningRepository.findActiveWarnings(LocalDate.now());
    }

    public WarningModel getWarningById(UUID id) {
        return warningRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aviso não encontrado com ID: " + id));
    }

    public List<WarningModel> getWarningsByPriority(Priority priority) {
        return warningRepository.findByPriority(priority);
    }

    @Transactional
    public WarningModel updateWarning(UUID id, WarningModel updatedWarning) {
        WarningModel existingWarning = getWarningById(id);

        if (updatedWarning.getTitle() != null && !updatedWarning.getTitle().trim().isEmpty()) {
            existingWarning.setTitle(updatedWarning.getTitle());
        }
        if (updatedWarning.getPriority() != null) {
            existingWarning.setPriority(updatedWarning.getPriority());
        }
        if (updatedWarning.getExpirationDate() != null) {
            existingWarning.setExpirationDate(updatedWarning.getExpirationDate());
        }

        return warningRepository.save(existingWarning);
    }

    @Transactional
    public void deleteWarning(UUID id) {
        if (!warningRepository.existsById(id)) {
            throw new RuntimeException("Aviso não encontrado com ID: " + id);
        }
        warningRepository.deleteById(id);
    }

    public boolean existsById(UUID id) {
        return warningRepository.existsById(id);
    }
}