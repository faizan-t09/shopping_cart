import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { rootStateType } from "../React-Redux/rootReducer";
import cartAction from "src/React-Redux/actions/cartActions";

const useCartActionsHelper = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: rootStateType) => state.cart);

  //Removes Item from the cart
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
    return fetch(`${process.env.REACT_APP_MY_API_BASE_URL}/cart/${id}`, {
      method: "DELETE",
    });
  };

  return { onRemoveFromCart };
};

export default useCartActionsHelper;
