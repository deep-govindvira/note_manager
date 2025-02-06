package com.example.note_manager_backend.controllers;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.entity.User;
import com.example.note_manager_backend.interfaces.NoteRepository;
import com.example.note_manager_backend.interfaces.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "*")
public class NoteController {
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public String save(@RequestBody Map<String, String> requestData) {

        String title = requestData.get("title");
        String description = requestData.get("description");
        String color = requestData.get("color");
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");

        if (title == null) return nullMessage("title");
        if (description == null) return nullMessage("description");
        if (color == null) return nullMessage("color");
        if (emailID == null) return nullMessage("emailID");
        if (password == null) return nullMessage("password");

        if (title.isEmpty()) return emptyMessage("title");
        if (description.isEmpty()) return emptyMessage("description");
        if (color.isEmpty()) return emptyMessage("color");
        if (emailID.isEmpty()) return emptyMessage("emailID");
        if (password.isEmpty()) return emptyMessage("password");

        if (userRepository.existsById(emailID)) {
            User user = userRepository.getReferenceById(emailID);
            if (user.getPassword().equals(password)) {
                Note note = Note.builder()
                    .title(title)
                    .description(description)
                    .color(color)
                    .user(user)
                    .build();
                noteRepository.save(note);
                log.info("saved Note {}", note);
                return "Note saved successfully";
            }
            else return "Password is wrong.";
        }
        else return "User doesn't exist.";
    }

    private String nullMessage(String string) {
        String message = string + " can't be null";
        log.info(message);
        return message;
    }
    private String emptyMessage(String string) {
        String message = string + " can't be empty";
        log.info(message);
        return message;
    }
}
