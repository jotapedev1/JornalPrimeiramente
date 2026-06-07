package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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

    private LocalDateTime commentCreatedAt;
    private String commentContent;

    @ManyToOne(optional = false)
    @JoinColumn(name = "commentUserId", nullable = false)
    @JsonIgnore
    private UserModel commentUser;

    @ManyToOne(optional = false)
    @JoinColumn(name = "commentMediaId", nullable = false)
    @JsonIgnore
    private MediaModel commentMedia;
}
