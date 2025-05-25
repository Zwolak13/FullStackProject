package com.fullstackproject.backend.dto;

public class UserDto {
    private Long id;
    private String email;
    private String username;

    // konstruktor
    public UserDto(Long id, String email, String username) {
        this.id = id;
        this.email = email;
        this.username = username;
    }

    // gettery i settery
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
