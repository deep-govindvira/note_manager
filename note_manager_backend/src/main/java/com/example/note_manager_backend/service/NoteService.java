package com.example.note_manager_backend.service;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.entity.User;
import com.example.note_manager_backend.interfaces.NoteRepository;
import com.example.note_manager_backend.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoteService {

    @Autowired
    private final NoteRepository noteRepository;
    @Autowired
    private final UserRepository userRepository;

    public String saveNote(String title, String description, String color, String emailID, String password) {
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

        Optional<User> userOptional = userRepository.findById(emailID);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                Note note = Note.builder()
                        .title(title)
                        .description(description)
                        .color(color)
                        .user(user)
                        .build();
                noteRepository.save(note);
                log.info("Saved Note: {}", note);
                return "Note saved successfully";
            } else {
                return "Password is wrong.";
            }
        } else {
            return "User doesn't exist.";
        }
    }

    private String nullMessage(String field) {
        String message = field + " can't be null";
        log.info(message);
        return message;
    }

    private String emptyMessage(String field) {
        String message = field + " can't be empty";
        log.info(message);
        return message;
    }
}
