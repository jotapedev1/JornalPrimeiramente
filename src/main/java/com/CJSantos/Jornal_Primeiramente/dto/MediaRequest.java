package com.CJSantos.Jornal_Primeiramente.dto;

import com.CJSantos.Jornal_Primeiramente.model.Media;
import lombok.Data;

import java.util.UUID;

@Data
public class MediaRequest {
    private UUID mediaId;
    private String mediaTitle;
    private String mediaDescription;
    private String mediaAuthor;
    private String mediaUrl;
    private String mediaContent;
    private Media mediaType;
    private boolean hasCover;
    private boolean coverGenerated;
}
