package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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

    }

    @Test
    void authenticate_should_return_empty_if_password_does_not_match() {
    }

    @Test
    void authenticate_should_return_empty_if_user_is_not_found() {

    }

    @Test
    void getCurrentUser_should_return_current_user() {

    }

    @Test
    void getCurrentUser_should_throw_exception_if_user_is_not_found() {}

    @Test
    void findByEmail_should_return_user_with_given_email() {
    }
}