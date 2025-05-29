package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_should_return_saved_user() {
        User user = new User();
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.saveUser(user);

        assertEquals(user, result);
        verify(userRepository).save(user);
    }

    @Test
    void authenticate_should_authenticate_when_user_is_present_and_passwords_match() {
        String email = "test@example.com";
        String password = "Password_123";

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Optional<User> result = userService.authenticate(email, password);

        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    void authenticate_should_return_empty_if_password_does_not_match() {
        String email = "test@example.com";
        String password = "Password_123";

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Optional<User> result = userService.authenticate(email, "wrongPassword");

        assertFalse(result.isPresent());
    }

    @Test
    void authenticate_should_return_empty_if_user_is_not_found() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        Optional<User> result = userService.authenticate("test@example.com", "Password_123");

        assertFalse(result.isPresent());
    }

    @Test
    void getCurrentUser_should_return_current_user() {
        String email = "test@example.com";

        User user = new User();
        user.setEmail(email);

        // Set up mock authentication in security context
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        User result = userService.getCurrentUser();

        assertEquals(user, result);
    }

    @Test
    void getCurrentUser_should_throw_exception_if_user_is_not_found() {
        String email = "test@example.com";

        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.getCurrentUser());
    }

    @Test
    void findByEmail_should_return_user_with_given_email() {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Optional<User> result = userService.findByEmail(email);

        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }
}