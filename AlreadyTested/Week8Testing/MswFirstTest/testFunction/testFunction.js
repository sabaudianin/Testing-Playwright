export async function testFunction() {
  const response = await fetch("https://example.com/data");
  console.log(response);
  const data = await response.json();

  return data;
}
