package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
@Entity
@Table(name = "reader")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReaderModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reader_id", columnDefinition = "UUID")
    private UUID readerId;

    @Column(name = "bio", nullable = false, length = 300)
    private String bio;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "password", nullable = false, length = 20)
    private String password;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "photo")
    private byte[] photo;

    @Column(nullable = false, length = 100)
    private String hash;
}
