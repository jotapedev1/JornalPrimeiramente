package com.CJSantos.Jornal_Primeiramente.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(
        name="save",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"saveUserId", "saveMediaId"}
        )
)public class SaveModel {
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID saveId;
    private LocalDateTime saveCreatedAt;

    @JsonBackReference(value = "user-save")
    @ManyToOne(optional = false)
    @JoinColumn(name = "saveUserId", nullable = false)
    @JsonIgnore
    private UserModel saveUser;

    @JsonBackReference(value = "media-save")
    @ManyToOne(optional = false)
    @JoinColumn(name = "saveMediaId", nullable = false)
    @JsonIgnore
    private MediaModel saveMedia;
}
