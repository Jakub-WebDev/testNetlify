import { useDispatch } from "react-redux";

import useProducts from "./useProducts"; // Import your useProducts hook
import { updateProductFavourite } from "../features/products/productsSlice";

const useFavourite = () => {
  const dispatch = useDispatch();
  const { products: allProducts } = useProducts(); // Get products from useProducts

  const handleFavouriteToggle = (id) => {
    const product = allProducts.find((product) => product.id === id);
    if (!product) return;

    const newFavouriteStatus = !product.favourite;

    // Dispatch action to update the Redux store
    dispatch(updateProductFavourite({ id, favourite: newFavouriteStatus }));

    // Make a PUT request to update the server
    fetch(`https://7ce9-195-191-163-209.ngrok-free.app/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        favourite: newFavouriteStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Updated successfully:", data))
      .catch((error) => console.error("Error updating product:", error));
  };

  return { handleFavouriteToggle };
};

export default useFavourite;
