package com.fullstackproject.backend.repository;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.model.ShoppingList;
import com.fullstackproject.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    Optional<ShoppingList> findByName(String name);
    List<ShoppingList> findByUser(User user);
    List<ShoppingList> findByCreationDate(LocalDateTime creationDate);
    List<ShoppingList> findByCompletionDate(LocalDateTime completionDate);
    List<ShoppingList> findByPrice(BigDecimal price);
    List<ShoppingList> findByCompleted(boolean completed);
}
