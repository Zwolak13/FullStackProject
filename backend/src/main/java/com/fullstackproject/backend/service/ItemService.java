package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    // Konstruktor do wstrzykiwania repozytorium
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }


    // Zapisz nowy item
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    // Znajdź item po ID
    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    // Znajdź item po nazwie
    public Optional<Item> findByName(String name) {
        return itemRepository.findByName(name);
    }

    // Znajdź itemy o cenie mniejszej lub równej danej wartości
    public List<Item> findByMaxPrice(BigDecimal maxPrice) {
        return itemRepository.findAll().stream()
                .filter(item -> item.getPrice().compareTo(maxPrice) <= 0)
                .toList();
    }

    // Usuń item po ID
    public void deleteById(Long id) {
        itemRepository.deleteById(id);
    }

    // Pobierz wszystkie itemy
    public List<Item> findAll() {
        return itemRepository.findAll();
    }
}
