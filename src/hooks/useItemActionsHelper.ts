import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { rootStateType } from "../React-Redux/rootReducer";
import cartAction from "src/React-Redux/actions/cartActions";
import itemAction from "src/React-Redux/actions/itemActions";

const useItemActionsHelper = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: rootStateType) => state.cart);

  //Removes item from the items
  const deleteItem = (itemId: number): void => {
    console.log("Delete item called", itemId)
    deleteItemFromDb(itemId)
      .then((res) => res.text())
      .then((data) => {
        toast.success(`Deleted item.`);
        dispatch(itemAction.delete(itemId));
        //Removes the item from the cart as well
        dispatch(cartAction.delete(itemId));
      })
      .catch((error) => {
        toast.error(`Failed to Delete item.`);
      });
    if(cart.filter(item => item.id === itemId).length)
      onRemoveFromCart(itemId);
  };

  const onRemoveFromCart = (itemId: number): void => {
    removeFromDbCart(itemId)
      .then(() => {
        toast.success("Removed from cart sucessfully");
        if (cart.filter((cartItem) => cartItem.id === itemId)[0].count! > 1) {
          dispatch(cartAction.DecrementCount(itemId));
        } else {
          dispatch(cartAction.delete(itemId));
        }
      })
      .catch(() => {
        toast.error("Failed to remove from cart");
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
    console.log("toggleWishlist called", itemId)
    toggleWishlistOnDb(itemId)
      .then(() => {
        toast.success("Toggled wishlist");
        dispatch(itemAction.toggleWishList(itemId));
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
    console.log("onAddToCart called", item)
    addToCartOnDb(item.id)
      .then(() => {
        toast.success("Added to cart sucessfully");
        if (
          cart.filter((cartItem) => {
            return cartItem.id === item.id;
          }).length === 0
        ) {
          dispatch(cartAction.Add({...item,count:1}));
        } else {
          dispatch(cartAction.IncrementCount(item.id));
        }
      })
      .catch(() => {
        toast.error("Failed to add to cart");
      });
  };

  return { deleteItem, toggleWishlist, onAddToCart };
};

export default useItemActionsHelper;
