import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { rootStateType } from "../React-Redux/rootReducer";
import { cartActions } from "src/React-Redux/cartReducer";
import { itemActions } from "src/React-Redux/itemReducer";

const useItemActionsHelper = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: rootStateType) => state.cart);

  //Removes item from the items
  const deleteItem = (itemId: number): void => {
    deleteItemFromDb(itemId)
      .then((res) => res.text())
      .then((data) => {
        dispatch(itemActions.deleteFromItems(itemId));
        //Removes the item from the cart as well
        dispatch(cartActions.deleteFromCart(itemId));
        toast.success(`Deleted item.`);
      })
      .catch((error) => {
        toast.error(`Failed to Delete item.`);
      });
    if (cart.filter((item) => item.id === itemId).length)
      deleteFromCart(itemId);
  };

  const deleteFromCart = (itemId: number): void => {
    removeFromDbCart(itemId)
      .then(() => {
        dispatch(cartActions.deleteFromCart(itemId));
        toast.success("Removed from cart sucessfully");
      })
      .catch((error) => {
        toast.error("Failed to remove from cart 2 " + error);
      });
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
  const toggleWishlist = (itemId: number): void => {
    toggleWishlistOnDb(itemId)
      .then(() => {
        toast.success("Toggled wishlist");
        dispatch(itemActions.toggleWishlist(itemId));
      })
      .catch(() => {
        toast.error("Failed to toggle wishlist");
      });
  };

  const addToCartOnDb = async (id: Number) => {
    return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/${id}`, {
      method: "POST",
    });
  };

  //Adds a item to the cart
  const onAddToCart = (item: itemType): void => {
    addToCartOnDb(item.id)
      .then(() => {
        toast.success("Added to cart sucessfully");
        if (
          cart.filter((cartItem) => {
            return cartItem.id === item.id;
          }).length === 0
        ) {
          dispatch(cartActions.addToCart({ ...item, count: 1 }));
        } else {
          dispatch(cartActions.incrementCount(item.id));
        }
      })
      .catch(() => {
        toast.error("Failed to add to cart");
      });
  };

  return { deleteItem, toggleWishlist, onAddToCart };
};

export default useItemActionsHelper;
