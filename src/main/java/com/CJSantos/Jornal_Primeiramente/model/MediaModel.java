package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String mediaAuthor;

    @Enumerated(EnumType.STRING)
    private Media mediaType;

    private LocalDateTime mediaCreatedAt;

    @JsonIgnore
    @Column(columnDefinition = "bytea", name = "media_file")
    private byte[] mediaFile;

    @JsonIgnore
    private String mediaFileType;

    @JsonIgnore
    private Long mediaFileSize;

    private String mediaFileName;

    @JsonBackReference(value = "user-media")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mediaAuthorId", nullable = false)
    private UserModel user;

    // Relacionamento com edição (um artigo pertence a uma edição)
    @JsonBackReference(value = "edition-media")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edition_id", nullable = false)
    private EditionModel edition;

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