package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_notice", columnDefinition = "UUID")
    private UUID idNotice;

    @Column(length = 300)
    private String description;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private LocalDateTime creationDate = LocalDateTime.now();

    @Lob
    private byte[] photo;

    @ManyToOne
    @JoinColumn(name = "moderator_id")
    private ModeratorModel moderator; // FK para moderador
}
