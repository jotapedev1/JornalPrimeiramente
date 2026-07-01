package com.CJSantos.Jornal_Primeiramente.dto;

import lombok.Data;

import java.util.List;

@Data
public class EditionCreateRequest {
    private String title;
    private String editionNumber;
    private String publicationDate;
    private List<MediaCreateRequest> media;
}