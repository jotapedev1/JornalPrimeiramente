package com.CJSantos.Jornal_Primeiramente.controller;

import com.CJSantos.Jornal_Primeiramente.model.Priority;
import com.CJSantos.Jornal_Primeiramente.model.WarningModel;
import com.CJSantos.Jornal_Primeiramente.service.WarningService;
import com.CJSantos.Jornal_Primeiramente.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/warnings")
@RequiredArgsConstructor
public class WarningController {

    private final WarningService warningService;
    private final JwtUtil jwtUtil;

    // Criar aviso (apenas ADMIN)
    @PostMapping
    public ResponseEntity<?> createWarning(
            @Valid @RequestBody WarningModel warning,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        try {
            // Verificar se é ADMIN
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token não fornecido"));
            }

            String token = authHeader.substring(7);
            if (!jwtUtil.isAdminFromToken(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Apenas administradores podem criar avisos"));
            }

            WarningModel created = warningService.createWarning(warning);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao criar aviso: " + e.getMessage()));
        }
    }

    // Listar todos os avisos (público)
    @GetMapping
    public ResponseEntity<List<WarningModel>> getAllWarnings() {
        List<WarningModel> warnings = warningService.getAllWarnings();
        return ResponseEntity.ok(warnings);
    }

    // Listar avisos ativos (não expirados) - público
    @GetMapping("/active")
    public ResponseEntity<List<WarningModel>> getActiveWarnings() {
        List<WarningModel> activeWarnings = warningService.getActiveWarnings();
        return ResponseEntity.ok(activeWarnings);
    }


    // Buscar aviso por ID (público)
    @GetMapping("/{id}")
    public ResponseEntity<?> getWarningById(@PathVariable UUID id) {
        try {
            WarningModel warning = warningService.getWarningById(id);
            return ResponseEntity.ok(warning);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Buscar avisos por prioridade (público)
    @GetMapping("/priority/{priority}")
    public ResponseEntity<?> getWarningsByPriority(@PathVariable Priority priority) {
        try {
            List<WarningModel> warnings = warningService.getWarningsByPriority(priority);
            return ResponseEntity.ok(warnings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Atualizar aviso (apenas ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateWarning(
            @PathVariable UUID id,
            @Valid @RequestBody WarningModel warning,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        try {
            // Verificar se é ADMIN
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token não fornecido"));
            }

            String token = authHeader.substring(7);
            if (!jwtUtil.isAdminFromToken(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Apenas administradores podem atualizar avisos"));
            }

            WarningModel updated = warningService.updateWarning(id, warning);
            return ResponseEntity.ok(updated);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao atualizar aviso: " + e.getMessage()));
        }
    }

    // Deletar aviso (apenas ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWarning(
            @PathVariable UUID id,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        try {
            // Verificar se é ADMIN
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token não fornecido"));
            }

            String token = authHeader.substring(7);
            if (!jwtUtil.isAdminFromToken(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Apenas administradores podem deletar avisos"));
            }

            warningService.deleteWarning(id);
            return ResponseEntity.ok(Map.of("message", "Aviso deletado com sucesso"));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao deletar aviso: " + e.getMessage()));
        }
    }
}