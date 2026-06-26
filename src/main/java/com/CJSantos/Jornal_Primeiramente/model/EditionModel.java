package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "O título da edição é obrigatório.")
    @Size(max = 255)
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank(message = "O número da edição é obrigatório.")
    @Size(max = 30)
    @Column(name = "edition_number", nullable = false)
    private String editionNumber;

    @NotBlank(message = "A data de publicação é obrigatória.")
    @Column(name = "publication_date")
    private String publicationDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Uma edição possui várias mídias
    @JsonManagedReference(value = "edition-media")
    @OneToMany(
            mappedBy = "edition",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<MediaModel> media = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Adiciona mídia à edição
    public void addMedia(MediaModel mediaItem) {
        media.add(mediaItem);
        mediaItem.setEdition(this);
    }

    // Remove mídia da edição
    public void removeMedia(MediaModel mediaItem) {
        media.remove(mediaItem);
        mediaItem.setEdition(null);
    }

}