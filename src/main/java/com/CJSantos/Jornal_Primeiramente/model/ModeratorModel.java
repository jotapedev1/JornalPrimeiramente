package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "moderator")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModeratorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_moderator", columnDefinition = "CHAR(36)")
    private UUID idModerator;
}
