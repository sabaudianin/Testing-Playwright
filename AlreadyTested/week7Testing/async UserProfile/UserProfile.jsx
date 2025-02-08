import { useState, useEffect } from "react";

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setUser(null);
    setError(false);
    setNotFound(false);

    mockApiCall(userId)
      .then((data) => setUser(data))
      .catch((error) => {
        if (error.message === "NotFound") {
          return setNotFound(true);
        }

        setError(true);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops, something went wrong.</div>;
  }

  if (notFound) {
    return (
      <>
        <div>User not found.</div>
        <Toast message="User not found" />
      </>
    );
  }

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}

function Toast({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return <div>{message}</div>;
}

function mockApiCall(userId) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      switch (userId) {
        case 1:
          reject(new Error("Something went wrong"));
        case 2:
          reject(new Error("NotFound"));
        default:
          resolve({ id: userId, name: "John Doe", email: "john@example.com" });
      }
    }, 200)
  );
}
