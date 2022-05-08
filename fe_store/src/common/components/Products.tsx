import { ProductCard } from "common/components/ProductCard";

export const Products = (): JSX.Element => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
      {products.map((product) => (
        <ProductCard key={product} product={product} />
      ))}
    </div>
  );
};
