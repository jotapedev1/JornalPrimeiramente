package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "like_entry")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeEntryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_like", columnDefinition = "CHAR(36)")
    private UUID idLike;

    @ManyToOne
    @JoinColumn(name = "id_media")
    private MediaModel media;

    @ManyToOne
    @JoinColumn(name = "id_member")
    private MemberModel member;

    @ManyToOne
    @JoinColumn(name = "id_reader")
    private ReaderModel reader;
}
