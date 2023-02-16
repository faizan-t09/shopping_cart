import { useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "src/context/ShopContext";

const useCartActionsHelper = () => {
  const { cart, dispatchCart } = useContext(ShopContext);

  //Removes Item from the cart
  const onRemoveFromCart = (itemId: number): void => {
    removeFromDbCart(itemId)
      .then(() => {
        toast.success("Removed from cart sucessfully");
        if (cart.filter((cartItem) => cartItem.id === itemId)[0].count! > 1) {
          dispatchCart({
            type: "Decreament quantity",
            payload: { itemId: itemId },
          });
        } else {
          dispatchCart({ type: "Delete", payload: { itemId: itemId } });
        }
      })
      .catch(() => {
        toast.error("Failed to remove from cart");
      });
  };

  const removeFromDbCart = (id: Number) => {
    return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/${id}`, {
      method: "DELETE",
    });
  };

  return { onRemoveFromCart };
};

export default useCartActionsHelper;
