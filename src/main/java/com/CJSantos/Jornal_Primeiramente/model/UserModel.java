package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
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

    @NotBlank(message = "O nome é obrigatório.")
    @Size(min = 3, max = 100)
    @Column(name = "\"user_name\"", nullable = false)
    private String userName;

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "E-mail inválido.")
    @Column(name = "\"user_email\"", nullable = false, unique = true)
    private String userEmail;

    @Transient
    private String userPassword;

    @NotBlank
    @Column(name = "\"user_hash\"", nullable = false)
    private String userHash;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "\"user_role\"", nullable = false)
    private Role userRole;

    @Column(name = "\"user_created_at\"")  // ← ASPAS DUPLAS
    private LocalDateTime userCreatedAt;

    @JsonManagedReference(value = "user-media")
    @OneToMany(mappedBy = "user")
    private List<MediaModel> medias;

    @JsonManagedReference(value = "user-comment")
    @OneToMany(mappedBy = "commentUser")
    private List<CommentModel> comments;

    @JsonManagedReference(value = "user-like")
    @OneToMany(mappedBy = "likeUser")
    private List<LikeModel> likes;

    @JsonManagedReference(value = "user-save")
    @OneToMany(mappedBy = "saveUser")
    private List<SaveModel> saves;

    @Column(name = "\"deactivation_requested_at\"")
    private LocalDateTime deactivationRequestedAt;

    @PrePersist
    public void prePersist() {
        this.userCreatedAt = LocalDateTime.now();
    }
}