package com.CJSantos.Jornal_Primeiramente.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    private UUID id;
    private String content;
    private UUID userId;
    private String userName;
    private UUID mediaId;
    private LocalDateTime createdAt;
}