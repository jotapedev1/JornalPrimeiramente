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
@Table(
        name = "\"like\"",
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
    @JsonIgnore
    private UserModel likeUser;

    @ManyToOne(optional = false)
    @JoinColumn(name = "likeMediaId", nullable = false)
    @JsonIgnore
    private MediaModel likeMedia;
}
