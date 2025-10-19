package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "member")
//Lombok saving lives below OMG
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", columnDefinition = "UUID")
    private UUID memberId;

    @Column(name = "bio", nullable = false, length = 300)
    private String bio;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "password", nullable = false, length = 20)
    private String password;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "class", nullable = false, length = 10)
    private String classroom; //We cant use 'class' LOL

    @Lob
    private byte[] photo;

    @Column(nullable = false, length = 100)
    private String hash;
}
