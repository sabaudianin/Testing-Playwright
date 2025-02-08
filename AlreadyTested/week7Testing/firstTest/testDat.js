export function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

export const data = {
  name: "test obj",
  props: {
    id: 1,
    isActive: true,
    tags: ["js", "testing"],
  },
  price: null,
};

export function divide(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    throw new Error("Nie Dziel przez 0");
  }
  return firstNumber / secondNumber;
}

export function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: "John Doe", email: "john@example.com" });
      } else {
        reject(new Error("user not found"));
      }
    }, 1000);
  });
}

export function generateGreeting(name) {
  return `Hello ${name}`;
}

export function isEven(num) {
  return num % 2 === 0;
}
export function proccessNumber(num, callback) {
  callback(num * 2);
}
