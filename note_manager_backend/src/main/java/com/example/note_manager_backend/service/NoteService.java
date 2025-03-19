package com.example.note_manager_backend.service;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.entity.User;
import com.example.note_manager_backend.interfaces.NoteRepository;
import com.example.note_manager_backend.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoteService {

    @Autowired
    private final NoteRepository noteRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    public String saveNote(String title, String description, String color, String emailID, String password) {
        if (title == null || description == null || color == null || emailID == null || password == null) {
            return "All fields are required";
        }
        if (title.isEmpty() || description.isEmpty() || color.isEmpty() || emailID.isEmpty() || password.isEmpty()) {
            return "Fields cannot be empty";
        }

        Optional<User> userOptional = userRepository.findById(emailID);
        if (userOptional.isEmpty()) {
            return "User doesn't exist.";
        }

        User user = userOptional.get();

        // Validate password using BCrypt
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Incorrect password.";
        }

        Note note = Note.builder()
                .title(title)
                .description(description)
                .color(color)
                .user(user)
                .build();

        noteRepository.save(note);
        log.info("Note saved: {}", note);
        return "Note saved successfully";
    }

    public List<Note> getUserNotes(String emailID, String password) {
        if (!validateUser(emailID, password)) {
            return null;
        }
        return userRepository.findById(emailID).get().getNotes();
    }

    public boolean deleteNote(String emailID, String password, String noteId) {
        if (!validateUser(emailID, password)) {
            return false;
        }
        if (!noteRepository.existsById(noteId)) {
            log.info("Note with id {} does not exist", noteId);
            return false;
        }
        noteRepository.deleteById(noteId);
        return true;
    }

    public Note getNote(String emailID, String password, String noteId) {
        if (!validateUser(emailID, password)) {
            return null;
        }
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        return noteOptional.orElse(null);
    }

    public boolean updateNote(String emailID, String password, String noteId, String title, String description, String color) {
        if (!validateUser(emailID, password)) {
            return false;
        }
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        if (noteOptional.isPresent()) {
            Note note = noteOptional.get();
            note.setTitle(title);
            note.setDescription(description);
            note.setColor(color);
            noteRepository.save(note);
            return true;
        }
        return false;
    }

    private boolean validateUser(String emailID, String password) {
        if (emailID == null || password == null) {
            log.info("Email or password is null");
            return false;
        }
        Optional<User> userOptional = userRepository.findById(emailID);
        if (userOptional.isEmpty()) {
            log.info("User with emailID {} doesn't exist", emailID);
            return false;
        }
        User user = userOptional.get();

        // Match password using BCrypt
        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.info("Wrong password for user {}", emailID);
            return false;
        }
        return true;
    }
}
