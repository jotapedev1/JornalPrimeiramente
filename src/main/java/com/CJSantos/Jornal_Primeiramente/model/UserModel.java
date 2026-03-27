package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;
    private String userName, userEmail, userPassword;

    private LocalDateTime userCreatedAt;

    @PrePersist
    public void prePersist() {
        this.userCreatedAt = LocalDateTime.now();
    }

    @Enumerated(EnumType.STRING)
    private Role userRole;

    @OneToMany(mappedBy = "mediaAuthor")
    private List<MediaModel> medias;

    @OneToMany(mappedBy = "commentUser")
    private List<CommentModel> comments;

    @OneToMany(mappedBy = "likeUser")
    private List<LikeModel> likes;

    @OneToMany(mappedBy = "saveUser")
    private List<SaveModel> saves;
}
