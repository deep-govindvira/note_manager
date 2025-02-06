package com.example.note_manager_backend.controllers;

import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EchoController {

    @ToString
    static class MessageRequest {
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    @PostMapping("/echo")
    public MessageResponse echoMessage(@RequestBody MessageRequest request) {
        log.info("Request {}", request);
        return new MessageResponse(request.getMessage());
    }
}
