package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Data
@Entity
@Table(name = "like_entry")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeEntryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_like", columnDefinition = "UUID")
    private UUID idLike;

    @ManyToOne
    @JoinColumn(name = "media_id", nullable = false)
    private MediaModel media;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user; // Pode ser Reader, Member ou Moderator
}
