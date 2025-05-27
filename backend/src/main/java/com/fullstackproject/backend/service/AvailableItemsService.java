package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.AvailableItems;
import com.fullstackproject.backend.repository.AvailableItemsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvailableItemsService {

    private final AvailableItemsRepository repository;

    public AvailableItemsService(AvailableItemsRepository repository) {
        this.repository = repository;
    }

    public List<AvailableItems> findAll() {
        return repository.findAll();
    }

    public Optional<AvailableItems> findById(Long id) {
        return repository.findById(id);
    }

    public AvailableItems save(AvailableItems Items) {
        return repository.save(Items);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
