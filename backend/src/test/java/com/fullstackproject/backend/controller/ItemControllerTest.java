package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.service.ItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ItemControllerTest {

    private ItemService itemService;
    private ItemController itemController;

    @BeforeEach
    void setUp() {
        itemService = mock(ItemService.class);
        itemController = new ItemController(itemService);
    }

    @Test
    void createItem_should_return_saved_item() {
        Item item = new Item();
        item.setName("Test Item");
        item.setPrice(BigDecimal.valueOf(10));
        item.setQuantity(5);

        when(itemService.saveItem(item)).thenReturn(item);

        ResponseEntity<Item> response = itemController.createItem(item);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(item, response.getBody());
        verify(itemService).saveItem(item);
    }

    @Test
    void getAllItems_should_return_list_of_items() {
        List<Item> items = List.of(new Item(), new Item());
        when(itemService.findAll()).thenReturn(items);

        ResponseEntity<List<Item>> response = itemController.getAllItems();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(items, response.getBody());
    }

    @Test
    void getItemById_should_return_item_when_found() {
        Item item = new Item();
        item.setId(1L);
        when(itemService.findById(1L)).thenReturn(Optional.of(item));

        ResponseEntity<Item> response = itemController.getItemById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(item, response.getBody());
    }

    @Test
    void getItemById_should_return_not_found_when_missing() {
        when(itemService.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Item> response = itemController.getItemById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void updateItem_should_update_and_return_item_when_found() {
        Item existingItem = new Item();
        existingItem.setId(1L);
        existingItem.setName("Old");
        existingItem.setQuantity(1);
        existingItem.setPrice(BigDecimal.valueOf(5));

        Item updatedItem = new Item();
        updatedItem.setName("New");
        updatedItem.setQuantity(10);
        updatedItem.setPrice(BigDecimal.valueOf(15));

        when(itemService.findById(1L)).thenReturn(Optional.of(existingItem));
        when(itemService.saveItem(any(Item.class))).thenReturn(existingItem);

        ResponseEntity<Item> response = itemController.updateItem(1L, updatedItem);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("New", response.getBody().getName());
        assertEquals(10, response.getBody().getQuantity());
        assertEquals(BigDecimal.valueOf(15), response.getBody().getPrice());
    }

    @Test
    void updateItem_should_return_not_found_when_item_does_not_exist() {
        when(itemService.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Item> response = itemController.updateItem(1L, new Item());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void deleteItem_should_call_service_and_return_no_content() {
        ResponseEntity<Void> response = itemController.deleteItem(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(itemService).deleteById(1L);
    }
}