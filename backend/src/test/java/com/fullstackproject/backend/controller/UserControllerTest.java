package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.security.JwtUtil;
import com.fullstackproject.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import net.bytebuddy.asm.Advice;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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

        when(userService.findByEmail("test@example.com"))
                .thenReturn(Optional.of(user));

        ResponseEntity<String> response = userController.registerUser(user);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Username already exists", response.getBody());
    }

    @Test
    void loginUser_should_login_user_with_valid_credentials() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("Test_password123");

        when(userService.authenticate("test@example.com", "Test_password123"))
                .thenReturn(Optional.of(user));

        when(jwtUtil.generateToken("test@example.com")).thenReturn("mocked-token");

        HttpServletResponse response = mock(HttpServletResponse.class);
        ResponseEntity<String> result = userController.loginUser(user, response);

        assertEquals(200, result.getStatusCodeValue());
        assertEquals("Login successful", result.getBody());

        verify(response).addHeader(eq("Set-Cookie"), contains("jwt=mocked-token"));
    }

    @Test
    void loginUser_should_not_login_user_with_invalid_credentials() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("Test_password123");

        when(userService.authenticate("test@example.com", "Test_password123"))
                .thenReturn(Optional.empty());

        HttpServletResponse response = mock(HttpServletResponse.class);
        ResponseEntity<String> result = userController.loginUser(user, response);

        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
        assertEquals("Invalid credentials", result.getBody());
    }

    @Test
    void logout_should_return_correct_cookie_and_logout_user() {
        User user = new User();
        ArgumentCaptor<Cookie> cookieCaptor = ArgumentCaptor.forClass(Cookie.class);

        HttpServletResponse response = mock(HttpServletResponse.class);
        ResponseEntity<?> result = userController.logout(response);
        verify(response).addCookie(cookieCaptor.capture());
        Cookie cookie = cookieCaptor.getValue();

        assertEquals("jwt", cookie.getName());
        assertNull(null, cookie.getValue());
        assertTrue(cookie.isHttpOnly());
        assertEquals("/", cookie.getPath());
        assertEquals(0, cookie.getMaxAge());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("Logged out successfully", result.getBody());
    }

    @Test
    void getCurrentUser() {

    }
}