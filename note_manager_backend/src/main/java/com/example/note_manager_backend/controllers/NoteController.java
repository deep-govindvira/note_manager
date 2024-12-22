package com.example.note_manager_backend.controllers;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.services.NoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @PostMapping("/save")
    public Note save(@RequestBody Note note) {
        note.setId(UUID.randomUUID().toString());
        log.info("Note {}", note);
        return noteService.saveUser(note);
    }
}
