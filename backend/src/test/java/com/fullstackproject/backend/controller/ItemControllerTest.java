package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.service.ItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;

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
    void getAllItems() {
    }

    @Test
    void getItemById() {
    }

    @Test
    void updateItem() {
    }

    @Test
    void deleteItem() {
    }
}