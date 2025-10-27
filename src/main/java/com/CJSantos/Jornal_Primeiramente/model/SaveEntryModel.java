package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Data
@Entity
@Table(name = "save_entry")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaveEntryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_save", columnDefinition = "UUID")
    private UUID idSave;

    @ManyToOne
    @JoinColumn(name = "media_id", nullable = false)
    private MediaModel media;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;
}
