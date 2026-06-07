package com.CJSantos.Jornal_Primeiramente.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    @NotBlank(message = "Comentário não pode ser vazio")
    @Size(max = 500, message = "Comentário deve ter no máximo 500 caracteres")
    private String content;
}