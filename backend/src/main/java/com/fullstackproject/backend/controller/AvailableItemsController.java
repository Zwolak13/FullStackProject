package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.AvailableItems;
import com.fullstackproject.backend.service.AvailableItemsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/available-items")
public class AvailableItemsController {

    private final AvailableItemsService service;

    public AvailableItemsController(AvailableItemsService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<AvailableItems>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity<AvailableItems> create(@RequestBody AvailableItems Items) {
        return ResponseEntity.ok(service.save(Items));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
