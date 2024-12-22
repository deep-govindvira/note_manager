package com.example.note_manager_backend.services;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.interfaces.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note saveUser(Note user) {
        return noteRepository.save(user);
    }
}
