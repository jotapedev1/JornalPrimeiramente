package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "save_entry")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveEntryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_save", columnDefinition = "CHAR(36)")
    private UUID idSave;

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
