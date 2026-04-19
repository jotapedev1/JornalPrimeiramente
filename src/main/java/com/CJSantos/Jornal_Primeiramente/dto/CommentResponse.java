package com.CJSantos.Jornal_Primeiramente.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    private UUID id;
    private String content;
    private UUID userId;
    private UUID mediaId;
}
