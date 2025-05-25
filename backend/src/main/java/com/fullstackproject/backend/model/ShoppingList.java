package com.fullstackproject.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
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
    private LocalDate  dueDate;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @JsonManagedReference
    @OneToMany(mappedBy = "shoppingList", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public ShoppingList() {}

    public ShoppingList(String name, boolean completed, LocalDate  dueDate, String description, BigDecimal price, List<Item> items, User user) {
        this.name = name;
        this.completed = completed;
        this.dueDate = dueDate;
        this.description = description;
        this.price = price;
        this.items = items;
        this.user = user;
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

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setCreationDate(LocalDate  dueDate) {
        this.dueDate = dueDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public void addItem(Item item) {
        items.add(item);
        item.setShoppingList(this);
    }

    public void removeItem(Item item) {
        items.remove(item);
        item.setShoppingList(null);
    }
}
