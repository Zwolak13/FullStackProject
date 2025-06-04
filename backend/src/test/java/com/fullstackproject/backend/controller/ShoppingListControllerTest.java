package com.fullstackproject.backend.controller;

import com.fullstackproject.backend.model.ShoppingList;
import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.service.ShoppingListService;
import com.fullstackproject.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

class ShoppingListControllerTest {

    @InjectMocks
    private ShoppingListController controller;

    @Mock
    private ShoppingListService shoppingListService;

    @Mock
    private UserService userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createShoppingList_should_return_saved_list() {
        ShoppingList list = new ShoppingList();
        list.setName("Groceries");

        when(shoppingListService.saveShoppingList(any())).thenReturn(list);

        ResponseEntity<ShoppingList> response = controller.createShoppingList(list);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Groceries", response.getBody().getName());
    }

    @Test
    void getAllShoppingLists_should_return_lists_for_current_user() {
        User user = new User();
        user.setId(1L);

        List<ShoppingList> lists = List.of(new ShoppingList(), new ShoppingList());

        when(userService.getCurrentUser()).thenReturn(user);
        when(shoppingListService.findByUserId(1L)).thenReturn(lists);

        ResponseEntity<List<ShoppingList>> response = controller.getAllShoppingLists();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
    }

    @Test
    void getShoppingListById_shouldReturnListIfFound() {
        ShoppingList list = new ShoppingList();
        list.setId(42L);

        when(shoppingListService.findById(42L)).thenReturn(Optional.of(list));

        ResponseEntity<ShoppingList> response = controller.getShoppingListById(42L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(42L, response.getBody().getId());
    }

    @Test
    void getShoppingListById_should_return_404_if_not_found() {
        when(shoppingListService.findById(42L)).thenReturn(Optional.empty());

        ResponseEntity<ShoppingList> response = controller.getShoppingListById(42L);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void getByName_should_return_list_if_found() {
        ShoppingList list = new ShoppingList();
        list.setName("Party");

        when(shoppingListService.findByName("Party")).thenReturn(Optional.of(list));

        ResponseEntity<ShoppingList> response = controller.getByName("Party");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Party", response.getBody().getName());
    }

    @Test
    void getByName_should_return_404_if_not_found() {
        when(shoppingListService.findByName("Party")).thenReturn(Optional.empty());

        ResponseEntity<ShoppingList> response = controller.getByName("Party");

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void getByMaxPrice_should_return_matching_lists() {
        BigDecimal max = BigDecimal.valueOf(50);
        List<ShoppingList> mockLists = List.of(new ShoppingList(), new ShoppingList());

        when(shoppingListService.findByMaxPrice(max)).thenReturn(mockLists);

        ResponseEntity<List<ShoppingList>> response = controller.getByMaxPrice(max);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
    }

    @Test
    void completeShoppingList_should_return_updated_list() {
        ShoppingList list = new ShoppingList();
        list.setCompleted(true);

        when(shoppingListService.completeShoppingList(99L)).thenReturn(list);

        ShoppingList result = controller.completeShoppingList(99L);

        assertTrue(result.isCompleted());
    }

    @Test
    void updateShoppingList_should_return_updated_list() {
        ShoppingList updated = new ShoppingList();
        updated.setName("Updated");

        when(shoppingListService.updateShoppingList(eq(1L), any())).thenReturn(updated);

        ShoppingList result = controller.updateShoppingList(1L, updated);

        assertEquals("Updated", result.getName());
    }

    @Test
    void deleteShoppingList_should_return_no_content() {
        doNothing().when(shoppingListService).deleteById(1L);

        ResponseEntity<Void> response = controller.deleteShoppingList(1L);

        assertEquals(204, response.getStatusCodeValue());
    }
}