package com.fullstackproject.backend.repository;

import com.fullstackproject.backend.model.AvailableItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AvailableItemsRepository extends JpaRepository<AvailableItems, Long> {
    Optional<AvailableItems> findByName(String name);
}

