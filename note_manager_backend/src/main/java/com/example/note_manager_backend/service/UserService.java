package com.example.note_manager_backend.service;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.entity.User;
import com.example.note_manager_backend.interfaces.NoteRepository;
import com.example.note_manager_backend.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;

    public List<Note> getNotes(String emailID, String password) {
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

    public String saveUser(String emailID, String name, String password) {
        if (emailID == null || name == null || password == null) {
            return "Fields cannot be null";
        }
        if (emailID.isEmpty() || name.isEmpty() || password.isEmpty()) {
            return "Fields cannot be empty";
        }
        if (userRepository.existsById(emailID)) {
            log.info("User with emailID {} already exists", emailID);
            return "EmailID " + emailID + " already exists";
        }
        User user = User.builder()
                .emailID(emailID)
                .name(name)
                .password(password)
                .build();
        userRepository.save(user);
        if (userRepository.existsById(emailID)) {
            return "User created successfully";
        }
        return "User creation failed";
    }

    public boolean isUserExist(String emailID, String password) {
        return validateUser(emailID, password);
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
        if (!user.getPassword().equals(password)) {
            log.info("Wrong password for user {}", emailID);
            return false;
        }
        return true;
    }
}
