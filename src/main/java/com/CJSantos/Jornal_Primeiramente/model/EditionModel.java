package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "edition")
public class EditionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "edition_id")
    private UUID editionId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "edition_number", nullable = false)
    private String editionNumber;

    @Column(name = "publication_date")
    private String publicationDate;

    //TODO: REMOVE THIS ATTRIBUTE
    @Column(name = "is_special_edition")
    private Boolean isSpecialEdition = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Relacionamento um-para-muitos com MediaModel (os artigos da edição)
    @OneToMany(mappedBy = "edition", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<MediaModel> articles = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public void addArticle(MediaModel article) {
        articles.add(article);
        article.setEdition(this);
        article.setMediaType(Media.ARTICLE); // Define o tipo como ARTIGO
    }

    public void removeArticle(MediaModel article) {
        articles.remove(article);
        article.setEdition(null);
    }
}