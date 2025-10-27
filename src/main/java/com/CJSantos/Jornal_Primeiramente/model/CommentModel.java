package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_comment", columnDefinition = "CHAR(36)")
    private UUID idComment;

    @Column(length = 300)
    private String content;

    @ManyToOne
    @JoinColumn(name = "id_media")
    private MediaModel media;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserModel user;
}
