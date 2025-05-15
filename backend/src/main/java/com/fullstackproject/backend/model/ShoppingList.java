package com.fullstackproject.backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "shopping_lists")
public class ShoppingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean completed;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    private LocalDateTime completionDate;

    @Column(nullable = false)
    private BigDecimal price;

    @OneToMany(mappedBy = "shoppingList", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public ShoppingList() {}

    public ShoppingList(Long id, String name, boolean completed, LocalDateTime creationDate, LocalDateTime completionDate, BigDecimal price, List<Item> items, User user) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.creationDate = creationDate;
        this.completionDate = completionDate;
        this.price = price;
        this.items = items;
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        this.creationDate = LocalDateTime.now();
    }

    // Gettery, settery, konstruktory

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDateTime completionDate) {
        this.completionDate = completionDate;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }
}
