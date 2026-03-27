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
@Table(name="like")
public class SaveModel {
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID saveId;
    private LocalDateTime saveCreatedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "saveUserId", nullable = false)
    private UserModel saveUser;

    @ManyToOne(optional = false)
    @JoinColumn(name = "saveMediaId", nullable = false)
    private MediaModel saveMedia;
}
