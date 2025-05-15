package com.fullstackproject.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShoppingList> shoppingLists = new ArrayList<>();


    // Constructors
    public User() {}

    public User(String username, String password, String email, List<ShoppingList> shoppingLists) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.shoppingLists = shoppingLists;
    }

    // Getters and setters
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<ShoppingList> getShoppingLists() { return  shoppingLists; }

    public void setShoppingLists(List<ShoppingList> shoppingLists) { this.shoppingLists = shoppingLists; }
}