package com.example.note_manager_backend.controllers;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.entity.User;
import com.example.note_manager_backend.interfaces.NoteRepository;
import com.example.note_manager_backend.interfaces.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/notes")
    public List<Note> notes(@RequestBody Map<String, String> requestData) {

        String emailID = requestData.get("emailID");
        String password = requestData.get("password");

        if (emailID == null) {
            nullMessage("emailID");
            return null;
        }
        if (password == null) {
            nullMessage("password");
            return null;
        }
        if (emailID.isEmpty()) {
            emptyMessage("emailID");
            return null;
        }
        if (password.isEmpty()) {
            emptyMessage("password");
            return null;
        }

        if (!userRepository.existsById(emailID)) {
            log.info("user " + emailID + " doesn't exist");
            return null;
        }

        User user = userRepository.findById(emailID).get();

        if (!user.getPassword().equals(password)) {
            log.info("wrong password : " + password);
            return null;
        }

        return user.getNotes();
    }

    @PostMapping("/notes/delete")
    public boolean deleteNote(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");

        if (emailID == null) {
            nullMessage("emailID");
            return false;
        }
        if (password == null) {
            nullMessage("password");
            return false;
        }
        if (emailID.isEmpty()) {
            emptyMessage("emailID");
            return false;
        }
        if (password.isEmpty()) {
            emptyMessage("password");
            return false;
        }

        if (!userRepository.existsById(emailID)) {
            log.info("user " + emailID + " doesn't exist");
            return false;
        }

        User user = userRepository.findById(emailID).get();

        if (!user.getPassword().equals(password)) {
            log.info("wrong password : " + password);
            return false;
        }

        String id = requestData.get("id");

        noteRepository.delete(noteRepository.getReferenceById(id));

        return true;
    }


    @PostMapping("/notes/get")
    public Note getNote(@RequestBody Map<String, String> requestData) {

        String emailID = requestData.get("emailID");
        String password = requestData.get("password");

        if (emailID == null) {
            nullMessage("emailID");
            return null;
        }
        if (password == null) {
            nullMessage("password");
            return null;
        }
        if (emailID.isEmpty()) {
            emptyMessage("emailID");
            return null;
        }
        if (password.isEmpty()) {
            emptyMessage("password");
            return null;
        }

        if (!userRepository.existsById(emailID)) {
            log.info("user " + emailID + " doesn't exist");
            return null;
        }

        User user = userRepository.findById(emailID).get();

        if (!user.getPassword().equals(password)) {
            log.info("wrong password : " + password);
            return null;
        }

        String id = requestData.get("id");

        return noteRepository.findById(id).get();
    }

    @PostMapping("/notes/update")
    public boolean updateNote(@RequestBody Map<String, String> requestData) {

        String emailID = requestData.get("emailID");
        String password = requestData.get("password");

        if (emailID == null) {
            nullMessage("emailID");
            return false;
        }
        if (password == null) {
            nullMessage("password");
            return false;
        }
        if (emailID.isEmpty()) {
            emptyMessage("emailID");
            return false;
        }
        if (password.isEmpty()) {
            emptyMessage("password");
            return false;
        }

        if (!userRepository.existsById(emailID)) {
            log.info("user " + emailID + " doesn't exist");
            return false;
        }

        User user = userRepository.findById(emailID).get();

        if (!user.getPassword().equals(password)) {
            log.info("wrong password : " + password);
            return false;
        }

        String title = requestData.get("title");
        String description = requestData.get("description");
        String color = requestData.get("color");
        String id = requestData.get("id");

        Note note = Note.builder()
                .user(user)
                .id(id)
                .title(title)
                .description(description)
                .color(color)
                .build();

        noteRepository.save(note);
        return  true;
    }

    @PostMapping("/save")
    public String save(@RequestBody Map<String, String> requestData) {

        String emailID = requestData.get("emailID");
        String name = requestData.get("name");
        String password = requestData.get("password");

        if (emailID == null) return nullMessage("emailID");
        if (name == null) return nullMessage("name");
        if (password == null) return nullMessage("password");

        if (emailID.isEmpty()) return emptyMessage("emailID");
        if (name.isEmpty()) return emptyMessage("name");
        if (password.isEmpty()) return emptyMessage("password");

        if (userRepository.existsById(emailID)) {
            log.info("existing emailID {}", emailID);
            return "emailID" + emailID + " already exist";
        }

        User user = User.builder()
            .emailID(emailID)
            .name(name)
            .password(password)
            .build();
        userRepository.save(user);

        if (userRepository.existsById(emailID)) {
            return "user created successfully";
        }
        return "user isn't created";
    }

    @PostMapping("/isExist")
    public ResponseEntity<Boolean>  isExist(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");

        if (emailID == null) return ResponseEntity.ok(false);
        if (password == null) return ResponseEntity.ok(false);

        if (!userRepository.existsById(emailID)) {
            log.info("does not exist emailID {}", emailID);
            return ResponseEntity.ok(false);
        }

        User user = userRepository.findById(emailID).get();

        if (!user.getPassword().equals(password)) {
            log.info("wrong password : " + password);
            return ResponseEntity.ok(false);
        }

        return ResponseEntity.ok(true);
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
