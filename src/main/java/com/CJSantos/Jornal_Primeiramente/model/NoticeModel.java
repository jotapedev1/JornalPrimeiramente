package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice") //Aviso
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_notice", columnDefinition = "CHAR(36)")
    private UUID idNotice;

    @Column(length = 300)
    private String description;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name = "id_moderator")
    private ModeratorModel moderator;
}
