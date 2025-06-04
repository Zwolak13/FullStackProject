package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.model.ShoppingList;
import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.repository.ShoppingListRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ShoppingListServiceTest {

    private ShoppingListRepository shoppingListRepository;
    private UserService userService;
    private ShoppingListService shoppingListService;

    @BeforeEach
    void setUp() {
        shoppingListRepository = mock(ShoppingListRepository.class);
        userService = mock(UserService.class);
        shoppingListService = new ShoppingListService(shoppingListRepository, userService);
    }

    @Test
    void saveShoppingList_should_calculate_price_and_set_user() {
        // given
        Item apple  = new Item(); apple.setPrice(BigDecimal.valueOf(2)); apple.setQuantity(3);
        Item bread  = new Item(); bread.setPrice(BigDecimal.valueOf(5)); bread.setQuantity(1);

        ShoppingList list = new ShoppingList();
        list.setItems(List.of(apple, bread));

        User currentUser = new User(); currentUser.setId(42L);
        when(userService.getCurrentUser()).thenReturn(currentUser);
        when(shoppingListRepository.save(any(ShoppingList.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // when
        ShoppingList saved = shoppingListService.saveShoppingList(list);

        // then
        assertEquals(BigDecimal.valueOf(11), saved.getPrice()); // 2*3 + 5*1
        assertEquals(currentUser, saved.getUser());

        verify(shoppingListRepository).save(saved);
    }

    @Test
    void findById() {
    }

    @Test
    void findByName() {
    }

    @Test
    void findByMaxPrice() {
    }

    @Test
    void completeShoppingList() {
    }

    @Test
    void updateShoppingList() {
    }

    @Test
    void deleteById() {
    }

    @Test
    void findByUserId() {
    }

    @Test
    void findAll() {
    }
}