package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // 🔹 Dodaj nowy item
    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item savedItem = itemService.saveItem(item);
        return ResponseEntity.ok(savedItem);
    }

    // 🔹 Pobierz wszystkie itemy
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.findAll());
    }

    // 🔹 Pobierz item po ID
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.findById(id);
        return item.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Wyszukaj itemy po typie (type)
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Item>> getItemsByType(@PathVariable String type) {
        return ResponseEntity.ok(itemService.findByType(type));
    }

    // 🔹 Zaktualizuj item po ID
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        Optional<Item> existingItem = itemService.findById(id);
        if (existingItem.isPresent()) {
            Item item = existingItem.get();
            item.setName(updatedItem.getName());
            item.setQuantity(updatedItem.getQuantity());
            item.setUnit(updatedItem.getUnit());
            item.setUnitPrice(updatedItem.getUnitPrice());
            item.setType(updatedItem.getType());

            return ResponseEntity.ok(itemService.saveItem(item));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 🔹 Usuń item po ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
