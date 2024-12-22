package com.example.note_manager_backend.interfaces;

import com.example.note_manager_backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, String> {
}