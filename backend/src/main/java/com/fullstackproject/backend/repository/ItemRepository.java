package com.fullstackproject.backend.repository;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByName(String name);
    List<Item> findByUnitPrice(BigDecimal unitPrice);
    List<Item> findByType(String type);
}
