package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.model.ShoppingList;
import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.repository.ShoppingListRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService {

    private final ShoppingListRepository shoppingListRepository;
    private final UserService userService;

    public ShoppingListService(ShoppingListRepository shoppingListRepository, UserService userService) {
        this.shoppingListRepository = shoppingListRepository;
        this.userService = userService;
    }

    // Zapisz nowy ShoppingList
    public ShoppingList saveShoppingList(ShoppingList shoppingList) {
        BigDecimal totalPrice = shoppingList.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        User currentUser = userService.getCurrentUser();
        shoppingList.setUser(currentUser);
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

    // Update shopping list po id
    @Transactional
    public ShoppingList updateShoppingList(Long id, ShoppingList updatedList) {
        ShoppingList existingList = shoppingListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("List not found"));

        existingList.setName(updatedList.getName());
        existingList.setDescription(updatedList.getDescription());
        existingList.setDueDate(updatedList.getDueDate());
        existingList.setCompleted(updatedList.isCompleted());

        existingList.getItems().removeIf(item ->
                updatedList.getItems().stream()
                        .noneMatch(updatedItem -> updatedItem.getId() != null && updatedItem.getId().equals(item.getId()))
        );

        for (Item updatedItem : updatedList.getItems()) {
            if (updatedItem.getId() != null) {
                existingList.getItems().stream()
                        .filter(item -> item.getId().equals(updatedItem.getId()))
                        .findFirst()
                        .ifPresent(existingItem -> {
                            existingItem.setName(updatedItem.getName());
                            existingItem.setPrice(updatedItem.getPrice());
                            existingItem.setQuantity(updatedItem.getQuantity());
                        });
            }
        }

        updatedList.getItems().stream()
                .filter(item -> item.getId() == null)
                .forEach(item -> {
                    item.setShoppingList(existingList);
                    existingList.getItems().add(item);
                });

        BigDecimal totalPrice = existingList.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        existingList.setPrice(totalPrice);

        return shoppingListRepository.save(existingList);
    }


    // Usuń ShoppingList po ID
    public void deleteById(Long id) {
        shoppingListRepository.deleteById(id);
    }

    public List<ShoppingList> findByUserId(Long userId) {
        return shoppingListRepository.findByUserId(userId);
    }

    // Pobierz wszystkie ShoppingListy
    public List<ShoppingList> findAll() {
        return shoppingListRepository.findAll();
    }
}
