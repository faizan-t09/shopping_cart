export type cartActionTypes =
  | {
      type: "Initialize Cart";
      payload: itemType[];
    }
  | {
      type:
        | "Delete from Cart"
        | "Increament quantity"
        | "Decreament quantity";
      payload: { itemId: number };
    }
  | {
      type: "Add to Cart";
      payload: itemType;
    };

export const initialCart: itemType[] = [];

export const cartReducer = (
  state: itemType[] = initialCart,
  action: cartActionTypes
) => {
  switch (action.type) {
    case "Initialize Cart":
      return [...action.payload];
    case "Add to Cart": {
      return [...state, action.payload];
    }
    case "Delete from Cart": {
      return state.filter((item) => item.id !== action.payload.itemId);
    }
    case "Increament quantity":
      return state.map((cartItem) => {
        if (cartItem.id === action.payload.itemId) {
          cartItem.count! += 1;
        }
        return cartItem;
      });
    case "Decreament quantity":
      return state.map((cartItem) => {
        if (cartItem.id === action.payload.itemId) {
          cartItem.count! -= 1;
        }
        return cartItem;
      });
    default:
      return state;
  }
};
