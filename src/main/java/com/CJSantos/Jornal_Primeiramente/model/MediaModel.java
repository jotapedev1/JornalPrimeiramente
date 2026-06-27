package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "O título da mídia é obrigatório.")
    @Size(max = 255, message = "O título deve possuir no máximo 255 caracteres.")
    @Column(nullable = false)
    private String mediaTitle;

    @Size(max = 5000, message = "A descrição deve possuir no máximo 5000 caracteres.")
    private String mediaDescription;

    @NotBlank(message = "A URL da mídia é obrigatória.")
    @Column(nullable = false)
    private String mediaUrl;

    @NotBlank(message = "O autor é obrigatório.")
    @Size(max = 150)
    @Column(nullable = false)
    private String mediaAuthor;

    @NotNull(message = "O tipo da mídia é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Media mediaType;

    @NotBlank(message = "O nome do arquivo é obrigatório.")
    private String mediaFileName;

    private LocalDateTime mediaCreatedAt;

    @JsonIgnore
    @Column(columnDefinition = "bytea", name = "media_file")
    private byte[] mediaFile;

    @JsonIgnore
    private String mediaFileType;

    @JsonIgnore
    private Long mediaFileSize;

    @JsonBackReference(value = "user-media")
    @NotNull(message = "O usuário é obrigatório.")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mediaAuthorId", nullable = false)
    private UserModel user;

    @JsonBackReference(value = "edition-media")
    @NotNull(message = "A edição é obrigatória.")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edition_id", nullable = false)
    private EditionModel edition;

    // Deleting media deletes all comments
    @JsonManagedReference(value = "media-comment")
    @OneToMany(mappedBy = "commentMedia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentModel> comments;

    @JsonManagedReference(value = "media-like")
    @OneToMany(mappedBy = "likeMedia")
    private List<LikeModel> likes;

    @JsonManagedReference(value = "media-save")
    @OneToMany(mappedBy = "saveMedia")
    private List<SaveModel> saves;

    @PrePersist
    protected void onCreate() {
        mediaCreatedAt = LocalDateTime.now();
    }
}