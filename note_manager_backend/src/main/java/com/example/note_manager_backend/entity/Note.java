package com.example.note_manager_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Note {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Lob
    private String title;
    @Lob
    private String description;
    private String color;
    private String createTime;
    private String updateTime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_emailID", nullable = false)
    @JsonBackReference
    private User user;

}
