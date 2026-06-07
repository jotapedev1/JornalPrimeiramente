package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "\"user\"")  // ← ASPAS DUPLAS na tabela
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "\"user_id\"")  // ← ASPAS DUPLAS
    private UUID userId;

    @Column(name = "\"user_name\"")  // ← ASPAS DUPLAS
    private String userName;

    @Column(name = "\"user_email\"")  // ← ASPAS DUPLAS
    private String userEmail;

    @Transient
    //@Column(name = "\"user_password\"")  // ← ASPAS DUPLAS
    private String userPassword;

    @Column(name = "\"user_hash\"")  // ← ASPAS DUPLAS
    private String userHash;

    @Column(name = "\"user_created_at\"")  // ← ASPAS DUPLAS
    private LocalDateTime userCreatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "\"user_role\"")  // ← ASPAS DUPLAS
    private Role userRole;

    @JsonManagedReference(value = "user-media")
    @OneToMany(mappedBy = "user")
    private List<MediaModel> medias;

    @OneToMany(mappedBy = "commentUser")
    private List<CommentModel> comments;

    @OneToMany(mappedBy = "likeUser")
    private List<LikeModel> likes;

    @OneToMany(mappedBy = "saveUser")
    private List<SaveModel> saves;

    @PrePersist
    public void prePersist() {
        this.userCreatedAt = LocalDateTime.now();
    }
}