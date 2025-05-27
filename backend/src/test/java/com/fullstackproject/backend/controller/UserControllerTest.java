package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.security.JwtUtil;
import com.fullstackproject.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserController userController;

    @Test
    void registerUser_should_register_new_user() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("Test_password123");

        when(userService.findByEmail("test@example.com"))
                .thenReturn(Optional.empty());
        ResponseEntity<String> response = userController.registerUser(user);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("User registered successfully", response.getBody());
    }

    @Test
    void registerUser_should_not_register_existing_user() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("Test_password123");

        when(userService.findByEmail("test@example.com"))
                .thenReturn(Optional.of(user));

        ResponseEntity<String> response = userController.registerUser(user);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Username already exists", response.getBody());
    }

    @Test
    void getUserByUsername() {
    }

    @Test
    void loginUser() {
    }

    @Test
    void logout() {
    }

    @Test
    void getCurrentUser() {
    }
}