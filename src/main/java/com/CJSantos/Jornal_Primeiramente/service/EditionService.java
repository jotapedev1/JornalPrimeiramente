package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.EditionModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.model.UserModel;
import com.CJSantos.Jornal_Primeiramente.repository.EditionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EditionService {

    private final EditionRepository editionRepository;

    public EditionService(EditionRepository editionRepository) {
        this.editionRepository = editionRepository;
    }

    public EditionModel createEdition(EditionModel edition, UserModel user) {

        if (edition.getTitle() == null || edition.getTitle().trim().isEmpty()) {
            throw new RuntimeException("O título da edição é obrigatório");
        }
        if (edition.getEditionNumber() == null || edition.getEditionNumber().trim().isEmpty()) {
            throw new RuntimeException("O número da edição é obrigatório");
        }
        edition.setCreatedAt(LocalDateTime.now());
        if (edition.getMedia() == null) {
            edition.setMedia(new ArrayList<>());
        }
        // Vincular mídia à edição
        for (MediaModel media : edition.getMedia()) {

            if (media.getMediaTitle() == null || media.getMediaTitle().trim().isEmpty()) {
                throw new RuntimeException("Toda mídia deve possuir título");
            }

            if (media.getMediaAuthor() == null || media.getMediaAuthor().trim().isEmpty()) {
                throw new RuntimeException("Toda mídia deve possuir autor");
            }

            media.setEdition(edition);

            media.setUser(user);
        }

        return editionRepository.save(edition);
    }

    public List<EditionModel> getAllEditions() {
        return editionRepository.findAll();
    }

    public EditionModel getEditionById(UUID id) {
        return editionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Edição não encontrada"));
    }

    public EditionModel getEditionByNumber(String editionNumber) {
        return editionRepository.findByEditionNumber(editionNumber)
                .orElseThrow(() -> new RuntimeException("Edição não encontrada"));
    }

    public List<EditionModel> getRecentEditions(int limit) {
        return editionRepository.findTopNOrderByCreatedAtDesc(limit);
    }

    public EditionModel updateEdition(UUID id, EditionModel updatedEdition) {

        EditionModel edition = getEditionById(id);

        if (updatedEdition.getTitle() != null &&
                !updatedEdition.getTitle().trim().isEmpty()) {
            edition.setTitle(updatedEdition.getTitle());
        }

        if (updatedEdition.getEditionNumber() != null &&
                !updatedEdition.getEditionNumber().trim().isEmpty()) {
            edition.setEditionNumber(updatedEdition.getEditionNumber());
        }

        if (updatedEdition.getPublicationDate() != null) {
            edition.setPublicationDate(updatedEdition.getPublicationDate());
        }

        return editionRepository.save(edition);
    }

    public EditionModel addMediaToEdition(UUID editionId, MediaModel media) {

        EditionModel edition = getEditionById(editionId);

        if (media.getMediaTitle() == null ||
                media.getMediaTitle().trim().isEmpty()) {
            throw new RuntimeException("O título da mídia é obrigatório");
        }

        if (media.getMediaAuthor() == null ||
                media.getMediaAuthor().trim().isEmpty()) {
            throw new RuntimeException("O autor da mídia é obrigatório");
        }

        media.setEdition(edition);

        edition.getMedia().add(media);

        return editionRepository.save(edition);
    }

    public EditionModel removeMediaFromEdition(UUID editionId, UUID mediaId) {

        EditionModel edition = getEditionById(editionId);

        MediaModel media = edition.getMedia()
                .stream()
                .filter(m -> m.getMediaId().equals(mediaId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Mídia não encontrada na edição"));

        edition.getMedia().remove(media);

        return editionRepository.save(edition);
    }

    public void deleteEdition(UUID id) {
        editionRepository.deleteById(id);
    }

    public long countEditions() {
        return editionRepository.count();
    }

    public List<EditionModel> getEditionsByDateRange(
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        return editionRepository.findByCreatedAtBetween(startDate, endDate);
    }
}