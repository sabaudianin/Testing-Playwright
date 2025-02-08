import { useGetProductQuery } from "./api";

export function ProductDetails({ productId }) {
  const { data: product, isError, isLoading } = useGetProductQuery(productId);

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (isError) {
    return <p>Could not load product details.</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: {product.price} EUR</p>
      <p>Quantity: {product.quantity} products</p>
      <p>Rating: {product.rating}/10</p>
    </div>
  );
}
