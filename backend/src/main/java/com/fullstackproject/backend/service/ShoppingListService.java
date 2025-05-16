package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.ShoppingList;
import com.fullstackproject.backend.repository.ShoppingListRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService {

    private final ShoppingListRepository shoppingListRepository;

    // Konstruktor do wstrzykiwania repozytorium
    public ShoppingListService(ShoppingListRepository shoppingListRepository) {
        this.shoppingListRepository = shoppingListRepository;
    }

    // Zapisz nowy ShoppingList
    public ShoppingList saveShoppingList(ShoppingList shoppingList) {
        BigDecimal totalPrice = shoppingList.getItems().stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        shoppingList.setPrice(totalPrice);
        return shoppingListRepository.save(shoppingList);
    }

    // Znajdź ShoppingList po ID
    public Optional<ShoppingList> findById(Long id) {
        return shoppingListRepository.findById(id);
    }

    // Znajdź ShoppingList po nazwie
    public Optional<ShoppingList> findByName(String name) {
        return shoppingListRepository.findByName(name);
    }

    // Znajdź ShoppingListy o cenie mniejszej lub równej danej wartości
    public List<ShoppingList> findByMaxPrice(BigDecimal maxPrice) {
        return shoppingListRepository.findAll().stream()
                .filter(shoppingList -> shoppingList.getPrice().compareTo(maxPrice) <= 0)
                .toList();
    }

    // Usuń ShoppingList po ID
    public void deleteById(Long id) {
        shoppingListRepository.deleteById(id);
    }

    // Pobierz wszystkie ShoppingListy
    public List<ShoppingList> findAll() {
        return shoppingListRepository.findAll();
    }
}
