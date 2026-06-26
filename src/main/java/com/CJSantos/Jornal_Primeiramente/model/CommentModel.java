package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="comment")
public class CommentModel {
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID commentId;

    @NotBlank(message = "O comentário não pode estar vazio.")
    @Size(max = 2000, message = "O comentário deve possuir no máximo 2000 caracteres.")
    @Column(nullable = false)
    private String commentContent;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "commentUserId", nullable = false)
    private UserModel commentUser;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "commentMediaId", nullable = false)
    private MediaModel commentMedia;

    private LocalDateTime commentCreatedAt;

    public void setCommentCreatedAt(LocalDateTime now) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCommentCreatedAt'");
    }
}
