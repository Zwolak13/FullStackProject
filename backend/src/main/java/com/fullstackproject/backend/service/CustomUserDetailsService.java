package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // Konstruktor do wstrzykiwania repozytorium
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Znajdź użytkownika w bazie
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Zwróć obiekt UserDetails (tu można dodać role, uprawnienia itd.)
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())  // hasło w formie zaszyfrowanej
                .authorities(Collections.emptyList())  // lub lista ról, np. "ROLE_USER"
                .build();
    }
}
