import { ShopContext } from "src/context/ShopContext";
import { toast } from "react-toastify";

import { useContext } from "react";

const useItemActionsHelper = () => {
  const { cart, dispatchItems, dispatchCart } = useContext(ShopContext);

  //Removes item from the items
  const deleteItem = async (itemId: number) => {
    try {
      await deleteItemFromDb(itemId);
      toast.success(`Deleted item.`);
      dispatchItems({ type: "Delete", payload: { itemId: itemId } });
      //Removes the item from the cart as well
      dispatchCart({ type: "Delete", payload: { itemId: itemId } });
    } catch {
      toast.error(`Failed to Delete item.`);
    }
    onRemoveFromCart(itemId);
  };

  const onRemoveFromCart = async (itemId: number) => {
    try {
      await removeFromDbCart(itemId);

      toast.success("Removed from cart sucessfully");
      if (cart.filter((cartItem) => cartItem.id === itemId)[0].count! > 1) {
        dispatchCart({
          type: "Decreament quantity",
          payload: { itemId: itemId },
        });
      } else {
        dispatchCart({ type: "Delete", payload: { itemId: itemId } });
      }
    } catch {
      toast.error("Failed to remove from cart");
    }
  };

  const removeFromDbCart = (id: Number) => {
    return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/delete/${id}`, {
      method: "DELETE",
    });
  };

  const deleteItemFromDb = async (id: Number) => {
    return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/product/${id}`, {
      method: "DELETE",
    });
  };

  const toggleWishlistOnDb = async (id: Number) => {
    return fetch(
      `${process.env.REACT_APP_MY_API_BASE_URL}/product/wishlist/${id}`,
      {
        method: "POST",
      }
    );
  };

  //Toggles wishlist for a item
  const toggleWishlist = async (itemId: number) => {
    try {
      await toggleWishlistOnDb(itemId);

      toast.success("Toggled wishlist");
      dispatchItems({ type: "ToggleWishlist", payload: { itemId: itemId } });
    } catch {
      toast.error("Failed to toggle wishlist");
    }
  };

  const addToCartOnDb = async (id: Number) => {
    return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/${id}`, {
      method: "POST",
    });
  };

  //Adds a item to the cart
  const onAddToCart = async (item: itemType) => {
    try {
      await addToCartOnDb(item.id);

      toast.success("Added to cart sucessfully");
      if (
        cart.filter((cartItem) => {
          return cartItem.id === item.id;
        }).length === 0
      ) {
        dispatchCart({ type: "Add", payload: { ...item, count: 1 } });
      } else {
        dispatchCart({
          type: "Increament quantity",
          payload: { itemId: item.id },
        });
      }
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return { deleteItem, toggleWishlist, onAddToCart };
};

export default useItemActionsHelper;
