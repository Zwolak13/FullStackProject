package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.ShoppingList;
import com.fullstackproject.backend.service.ShoppingListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shopping-lists")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody ShoppingList shoppingList) {
        return ResponseEntity.ok(shoppingListService.saveShoppingList(shoppingList));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<ShoppingList>> getAllShoppingLists() {
        return ResponseEntity.ok(shoppingListService.findAll());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ShoppingList> getShoppingListById(@PathVariable Long id) {
        Optional<ShoppingList> optional = shoppingListService.findById(id);
        return optional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET BY NAME
    @GetMapping("/name/{name}")
    public ResponseEntity<ShoppingList> getByName(@PathVariable String name) {
        Optional<ShoppingList> optional = shoppingListService.findByName(name);
        return optional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET BY MAX PRICE
    @GetMapping("/price")
    public ResponseEntity<List<ShoppingList>> getByMaxPrice(@RequestParam BigDecimal maxPrice) {
        return ResponseEntity.ok(shoppingListService.findByMaxPrice(maxPrice));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShoppingList(@PathVariable Long id) {
        shoppingListService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
