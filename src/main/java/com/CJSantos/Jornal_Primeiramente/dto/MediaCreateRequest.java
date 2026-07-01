package com.CJSantos.Jornal_Primeiramente.dto;

import com.CJSantos.Jornal_Primeiramente.model.Media;
import lombok.Data;

@Data
public class MediaCreateRequest {
    private String mediaTitle;
    private String mediaDescription;
    private String mediaAuthor;
    private Media mediaType;
}