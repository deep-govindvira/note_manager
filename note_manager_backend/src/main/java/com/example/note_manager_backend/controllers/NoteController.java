package com.example.note_manager_backend.controllers;

import com.example.note_manager_backend.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class NoteController {

    @Autowired
    private final NoteService noteService;

    @PostMapping
    public String save(@RequestBody Map<String, String> requestData) {
        String title = requestData.get("title");
        String description = requestData.get("description");
        String color = requestData.get("color");
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");

        return noteService.saveNote(title, description, color, emailID, password);
    }
}
