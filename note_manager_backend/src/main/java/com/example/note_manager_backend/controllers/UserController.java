package com.example.note_manager_backend.controllers;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/notes")
    public List<Note> notes(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");
        return userService.getNotes(emailID, password);
    }

    @PostMapping("/notes/delete")
    public boolean deleteNote(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");
        String id = requestData.get("id");
        return userService.deleteNote(emailID, password, id);
    }

    @PostMapping("/notes/get")
    public Note getNote(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");
        String id = requestData.get("id");
        return userService.getNote(emailID, password, id);
    }

    @PostMapping("/notes/update")
    public boolean updateNote(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");
        String id = requestData.get("id");
        String title = requestData.get("title");
        String description = requestData.get("description");
        String color = requestData.get("color");
        return userService.updateNote(emailID, password, id, title, description, color);
    }

    @PostMapping("/save")
    public String saveUser(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String name = requestData.get("name");
        String password = requestData.get("password");
        return userService.saveUser(emailID, name, password);
    }

    @PostMapping("/isExist")
    public ResponseEntity<Boolean> isExist(@RequestBody Map<String, String> requestData) {
        String emailID = requestData.get("emailID");
        String password = requestData.get("password");
        boolean isExist = userService.isUserExist(emailID, password);
        return ResponseEntity.ok(isExist);
    }
}
