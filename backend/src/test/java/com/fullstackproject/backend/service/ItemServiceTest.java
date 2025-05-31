package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ItemServiceTest {

    private ItemRepository itemRepository;
    private ItemService itemService;

    @BeforeEach
    void setUp() {
        itemRepository = mock(ItemRepository.class);
        itemService = new ItemService(itemRepository);
    }

    @Test
    void saveItem_should_return_saved_item() {
        Item item = new Item();
        when(itemRepository.save(item)).thenReturn(item);

        Item saved = itemService.saveItem(item);

        assertEquals(item, saved);
        verify(itemRepository).save(item);
    }

    @Test
    void findById_should_return_item_if_exists() {
        Item item = new Item();
        item.setId(1L);
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        Optional<Item> result = itemService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(item, result.get());
    }

    @Test
    void findById_should_return_empty_if_not_found() {
        when(itemRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Item> result = itemService.findById(1L);

        assertFalse(result.isPresent());
    }

    @Test
    void findByName_should_return_item_if_exists() {
        Item item = new Item();
        item.setName("TestItem");
        when(itemRepository.findByName("TestItem")).thenReturn(Optional.of(item));

        Optional<Item> result = itemService.findByName("TestItem");

        assertTrue(result.isPresent());
        assertEquals(item, result.get());
    }

    @Test
    void findByName_should_return_empty_if_not_found() {
        when(itemRepository.findByName("TestItem")).thenReturn(Optional.empty());

        Optional<Item> result = itemService.findByName("TestItem");

        assertFalse(result.isPresent());
    }

    @Test
    void findByMaxPrice_should_return_items_below_or_equal_price() {
        Item item1 = new Item();
        item1.setPrice(new BigDecimal("50"));

        Item item2 = new Item();
        item2.setPrice(new BigDecimal("100"));

        Item item3 = new Item();
        item3.setPrice(new BigDecimal("150"));

        when(itemRepository.findAll()).thenReturn(Arrays.asList(item1, item2, item3));

        List<Item> result = itemService.findByMaxPrice(new BigDecimal("100"));

        assertEquals(2, result.size());
        assertTrue(result.contains(item1));
        assertTrue(result.contains(item2));
        assertFalse(result.contains(item3));
    }

    @Test
    void deleteById() {
    }

    @Test
    void findAll() {
    }
}