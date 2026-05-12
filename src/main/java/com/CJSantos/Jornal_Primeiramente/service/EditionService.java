package com.CJSantos.Jornal_Primeiramente.service;

import com.CJSantos.Jornal_Primeiramente.model.EditionModel;
import com.CJSantos.Jornal_Primeiramente.model.MediaModel;
import com.CJSantos.Jornal_Primeiramente.repository.EditionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EditionService {

    private final EditionRepository editionRepository;
    private final MediaService mediaService;

    public EditionService(EditionRepository editionRepository, MediaService mediaService) {
        this.editionRepository = editionRepository;
        this.mediaService = mediaService;
    }

    public EditionModel createEdition(EditionModel edition) {
        // Validar campos obrigatórios
        if (edition.getTitle() == null || edition.getTitle().trim().isEmpty()) {
            throw new RuntimeException("O título da edição é obrigatório");
        }
        if (edition.getEditionNumber() == null || edition.getEditionNumber().trim().isEmpty()) {
            throw new RuntimeException("O número da edição é obrigatório");
        }

        // Definir data de criação
        edition.setCreatedAt(LocalDateTime.now());

        // Se não tiver lista de artigos, inicializa vazia
        if (edition.getArticles() == null) {
            edition.setArticles(new java.util.ArrayList<>());
        }

        // Salvar a edição primeiro
        EditionModel savedEdition = editionRepository.save(edition);

        // Garantir que cada artigo tenha referência à edição e seja salvo
        for (MediaModel article : savedEdition.getArticles()) {
            if (article.getMediaTitle() == null || article.getMediaTitle().trim().isEmpty()) {
                throw new RuntimeException("Todos os artigos devem ter título");
            }
            if (article.getMediaAuthor() == null || article.getMediaAuthor().trim().isEmpty()) {
                throw new RuntimeException("Todos os artigos devem ter autor");
            }
            article.setEdition(savedEdition);
            mediaService.createMedia(article);
        }

        return savedEdition;
    }

    public List<EditionModel> getAllEditions() {
        return editionRepository.findAll();
    }

    public EditionModel getEditionById(UUID id) {
        return editionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Edição não encontrada com ID: " + id));
    }

    public EditionModel getEditionByNumber(String editionNumber) {
        return editionRepository.findByEditionNumber(editionNumber)
                .orElseThrow(() -> new RuntimeException("Edição não encontrada com número: " + editionNumber));
    }

    public List<EditionModel> getEditionsBySpecialEdition(boolean isSpecial) {
        return editionRepository.findByIsSpecialEdition(isSpecial);
    }

    public List<EditionModel> getRecentEditions(int limit) {
        return editionRepository.findTopNOrderByCreatedAtDesc(limit);
    }

    public EditionModel updateEdition(UUID id, EditionModel updatedEdition) {
        EditionModel edition = getEditionById(id);

        if (updatedEdition.getTitle() != null && !updatedEdition.getTitle().trim().isEmpty()) {
            edition.setTitle(updatedEdition.getTitle());
        }
        if (updatedEdition.getEditionNumber() != null && !updatedEdition.getEditionNumber().trim().isEmpty()) {
            edition.setEditionNumber(updatedEdition.getEditionNumber());
        }
        if (updatedEdition.getPublicationDate() != null) {
            edition.setPublicationDate(updatedEdition.getPublicationDate());
        }
        if (updatedEdition.getIsSpecialEdition() != null) {
            edition.setIsSpecialEdition(updatedEdition.getIsSpecialEdition());
        }

        return editionRepository.save(edition);
    }

    public EditionModel addArticleToEdition(UUID editionId, MediaModel article) {
        EditionModel edition = getEditionById(editionId);

        // Validar artigo
        if (article.getMediaTitle() == null || article.getMediaTitle().trim().isEmpty()) {
            throw new RuntimeException("O título do artigo é obrigatório");
        }
        if (article.getMediaAuthor() == null || article.getMediaAuthor().trim().isEmpty()) {
            throw new RuntimeException("O autor do artigo é obrigatório");
        }

        article.setEdition(edition);
        MediaModel savedArticle = mediaService.createMedia(article);
        edition.getArticles().add(savedArticle);

        return editionRepository.save(edition);
    }

    public EditionModel removeArticleFromEdition(UUID editionId, UUID articleId) {
        EditionModel edition = getEditionById(editionId);

        MediaModel article = edition.getArticles().stream()
                .filter(a -> a.getMediaId().equals(articleId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Artigo não encontrado na edição"));

        article.setEdition(null);
        edition.getArticles().remove(article);

        // Opcional: deletar o artigo ou apenas desassociar
        // mediaService.deleteMedia(articleId); // Descomente se quiser deletar

        return editionRepository.save(edition);
    }

    public void deleteEdition(UUID id) {
        EditionModel edition = getEditionById(id);

        // Desassociar todos os artigos da edição antes de deletar
        for (MediaModel article : edition.getArticles()) {
            article.setEdition(null);
        }

        editionRepository.deleteById(id);
    }

    public long countEditions() {
        return editionRepository.count();
    }

    public List<EditionModel> getEditionsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return editionRepository.findByCreatedAtBetween(startDate, endDate);
    }
}