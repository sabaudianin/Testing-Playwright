import { useEffect, useState } from "react";

export function UserStatus({ userId }) {
  const [userData, setUserData] = useState(null);

  // Ładowanie danych użytkownika przy montowaniu komponentu
  useEffect(() => {
    const data = localStorage.getItem(`user-${userId}`);

    setUserData(data ? JSON.parse(data) : null);
  }, [userId]);

  // Zapisywanie danych użytkownika przy aktualizacji stanu
  useEffect(() => {
    if (userData) {
      localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
    }
  }, [userData]);

  // Czyszczenie danych użytkownika przy odmontowywaniu komponentu
  useEffect(() => {
    return () => {
      localStorage.removeItem(`user-${userId}`);
    };
  }, [userId]);

  // Obsługa aktualizacji danych użytkownika
  const handleUserDataUpdate = (newData) => {
    setUserData({ ...userData, ...newData });
  };

  // Wyświetlanie danych użytkownika lub stanu ładowania
  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <h1>User Status</h1>
      <p>{userData.name}</p>
      <button onClick={() => handleUserDataUpdate({ active: true })}>
        Set Active
      </button>
      <button onClick={() => handleUserDataUpdate({ active: false })}>
        Set Inactive
      </button>
    </div>
  );
}
