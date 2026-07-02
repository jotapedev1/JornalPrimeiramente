package com.CJSantos.Jornal_Primeiramente.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "warning")
public class WarningModel {

    @Id
    private UUID warningId;

    @NotBlank(message = "O título da edição é obrigatório.")
    @Size(max = 255)
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull(message = "A prioridade é obrigatória")
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

}
