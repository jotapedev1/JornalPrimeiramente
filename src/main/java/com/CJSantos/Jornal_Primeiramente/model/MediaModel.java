package com.CJSantos.Jornal_Primeiramente.model;

import com.CJSantos.Jornal_Primeiramente.MediaType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "media")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "media_id", columnDefinition = "UUID")
    private UUID mediaId;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Column(name = "save_count", nullable = false)
    private int likeCount;

    @Column(name = "save_count", nullable = false)
    private int saveCount;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Lob
    private byte[] image;

    @Column(name="title", nullable = false, length = 100)
    private String title;

    //Using ENUM
    @Enumerated(EnumType.STRING)
    private MediaType mediaType;

    @ManyToOne
    @JoinColumn(name = "id_member")
    private MemberModel member;

}
