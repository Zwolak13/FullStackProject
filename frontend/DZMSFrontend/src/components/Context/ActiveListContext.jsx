import { createContext, useContext, useEffect, useState } from 'react';

const ListsContext = createContext();

export function useLists() {
  return useContext(ListsContext);
}

export function ActiveListsProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchLists() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/shopping-lists',{
          method: 'GET',
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Błąd pobierania list');
        const data = await res.json();
        setLists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLists();
  }, []);

  async function addList(newList) {

    try {
      const res = await fetch('http://localhost:8080/api/shopping-lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  
        body: JSON.stringify(newList)
      });
      if (!res.ok) throw new Error('Błąd dodawania listy');
      const savedList = await res.json();
      setLists(prev => [...prev, savedList]);
    } catch (err) {
      setError(err.message);
      throw err; // możesz wyrzucić dalej, aby komponent mógł obsłużyć
    }
  }

  // 3. Update list
  async function updateList(id, updates) {
    try {
      const res = await fetch(`http://localhost:8080/api/shopping-lists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Błąd aktualizacji listy');
      const updatedList = await res.json();
      setLists(prev => prev.map(list => list.id === id ? updatedList : list));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // 4. Remove list
  async function removeList(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/shopping-lists/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Błąd usuwania listy');
      setLists(prev => prev.filter(list => list.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  return (
    <ListsContext.Provider value={{
      lists,
      loading,
      error,
      addList,
      updateList,
      removeList,
    }}>
      {children}
    </ListsContext.Provider>
  );
}
