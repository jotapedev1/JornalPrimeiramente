package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "integrante")
public class integranteModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_integrante", columnDefinition = "CHAR(36)")
    private UUID idIntegrante;

    @Column(nullable = false, length = 50)
    private String nome;

    @Column(nullable = false, length = 10)
    private String turma;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Lob
    private byte[] foto;

    @Column(nullable = false, length = 100)
    private String hash;

    // Construtores, Getters e Setters
    public integranteModel() {}

    // Getters e Setters...

}