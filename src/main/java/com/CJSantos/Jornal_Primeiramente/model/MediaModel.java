package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "media")
public class MediaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID mediaId;

    private String mediaTitle;
    private String mediaDescription;
    private String mediaUrl;

    @Enumerated(EnumType.STRING)
    private Media mediaType;

    private LocalDateTime mediaCreatedAt;

    @ManyToOne
    @JoinColumn(name = "mediaAuthorId", nullable = false)
    private UserModel user;

    // Relacionamento com edição (um artigo pertence a uma edição)
    @ManyToOne
    @JoinColumn(name = "edition_id")
    private EditionModel edition;

    // Campos adicionais para artigos
    private String articleAuthor;
    private Media articleCategory;

    // Deleting media deletes all comments
    @OneToMany(mappedBy = "commentMedia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentModel> comments;

    @OneToMany(mappedBy = "likeMedia")
    private List<LikeModel> likes;

    @OneToMany(mappedBy = "saveMedia")
    private List<SaveModel> saves;

    @PrePersist
    protected void onCreate() {
        mediaCreatedAt = LocalDateTime.now();
    }
}