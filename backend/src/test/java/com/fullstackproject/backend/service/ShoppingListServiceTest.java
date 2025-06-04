package com.fullstackproject.backend.service;

import com.fullstackproject.backend.model.Item;
import com.fullstackproject.backend.model.ShoppingList;
import com.fullstackproject.backend.model.User;
import com.fullstackproject.backend.repository.ShoppingListRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    void findById_should_return_list_when_exists() {
        ShoppingList list = new ShoppingList(); list.setId(1L);
        when(shoppingListRepository.findById(1L)).thenReturn(Optional.of(list));

        Optional<ShoppingList> result = shoppingListService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(list, result.get());
    }

    @Test
    void findByName_should_return_empty_when_missing() {
        when(shoppingListRepository.findByName("Groceries")).thenReturn(Optional.empty());

        assertTrue(shoppingListService.findByName("Groceries").isEmpty());
    }

    @Test
    void findByMaxPrice_should_filter_lists_correctly() {
        ShoppingList cheap  = new ShoppingList(); cheap.setPrice(BigDecimal.valueOf(30));
        ShoppingList pricey = new ShoppingList(); pricey.setPrice(BigDecimal.valueOf(120));

        when(shoppingListRepository.findAll()).thenReturn(List.of(cheap, pricey));

        List<ShoppingList> result = shoppingListService.findByMaxPrice(BigDecimal.valueOf(100));

        assertEquals(1, result.size());
        assertTrue(result.contains(cheap));
    }

    @Test
    void completeShoppingList_should_set_completed_true() {
        ShoppingList list = new ShoppingList(); list.setId(1L); list.setCompleted(false);

        when(shoppingListRepository.findById(1L)).thenReturn(Optional.of(list));
        when(shoppingListRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ShoppingList completed = shoppingListService.completeShoppingList(1L);

        assertTrue(completed.isCompleted());
        verify(shoppingListRepository).save(completed);
    }

    @Test
    void updateShoppingList_should_update_fields_and_recalculate_price() {
        ShoppingList existing = new ShoppingList();
        existing.setId(1L);
        existing.setName("Old");

        Item oldItem = new Item();
        oldItem.setId(10L);
        oldItem.setPrice(BigDecimal.valueOf(2));
        oldItem.setQuantity(1);

        existing.setItems(new ArrayList<>(List.of(oldItem)));

        ShoppingList updated = new ShoppingList();
        updated.setName("New");
        updated.setDescription("new-desc");
        updated.setCompleted(true);

        Item sameId = new Item();
        sameId.setId(10L);
        sameId.setPrice(BigDecimal.valueOf(3));
        sameId.setQuantity(2);

        Item newItem = new Item();
        newItem.setPrice(BigDecimal.valueOf(1));
        newItem.setQuantity(5);

        updated.setItems(List.of(sameId, newItem));

        when(shoppingListRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(shoppingListRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ShoppingList result = shoppingListService.updateShoppingList(1L, updated);

        assertEquals("New", result.getName());
        assertEquals("new-desc", result.getDescription());
        assertTrue(result.isCompleted());
        assertEquals(2, result.getItems().size());
        assertEquals(BigDecimal.valueOf(3*2 + 1*5), result.getPrice());
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