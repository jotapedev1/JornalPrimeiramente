package com.CJSantos.Jornal_Primeiramente.model;

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
@Table(
        name = "like",
        uniqueConstraints = @UniqueConstraint(
                //Way for the like be unique per user
                columnNames = {"likeUserId", "likeMediaId"}
        )
)
public class LikeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID likeId;

    private LocalDateTime likeCreatedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "likeUserId", nullable = false)
    private UserModel likeUser;

    @ManyToOne(optional = false)
    @JoinColumn(name = "likeMediaId", nullable = false)
    private MediaModel likeMedia;
}
