package com.example.note_manager_backend.interfaces;

import com.example.note_manager_backend.entity.Note;
import com.example.note_manager_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}