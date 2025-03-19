package com.example.note_manager_backend.service;


import com.example.note_manager_backend.entity.User;
import com.example.note_manager_backend.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    public boolean authenticate(String emailID, String password) {
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

        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.info("Wrong password for user {}", emailID);
            return false;
        }
        return true;
    }
}
