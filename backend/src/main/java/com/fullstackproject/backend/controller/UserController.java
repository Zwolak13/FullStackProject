package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.dto.UserDto;
import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.security.JwtUtil;
import com.fullstackproject.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;


import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // Rejestracja nowego użytkownika
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
        }

        userService.saveUser(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    // Pobranie użytkownika po username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.findByUsername(username);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest, HttpServletResponse response) {
        Optional<User> user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (user.isPresent()) {
            String token = jwtUtil.generateToken(loginRequest.getEmail());

            response.addHeader("Set-Cookie",
                    "jwt=" + token +
                            "; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400");

            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null); // albo "", jeśli null nie działa
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // usuń natychmiast
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ResponseEntity.ok(new UserDto(user.getId(), user.getEmail(), user.getUsername()));
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }


        String oldPassword = payload.get("oldPassword");
        String newPassword = payload.get("newPassword");

        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(oldPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Old password is incorrect");
        }

        user.setPassword(newPassword);
        userService.saveUser(user);

        return ResponseEntity.ok("Password changed successfully");
    }
}
