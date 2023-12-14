export type cartActionTypes =
  | {
      type: "Initialize";
      payload: itemType[];
    }
  | {
      type: "Delete" | "Remove" | "Increament quantity" | "Decreament quantity";
      payload: { itemId: number };
    }
  | {
      type: "Add";
      payload: itemType;
    };

export const initialCart: itemType[] = [];

export const cartReducer = (state: itemType[], action: cartActionTypes) => {
  switch (action.type) {
    case "Initialize":
      return [...action.payload];
    case "Add":
      return [...state, action.payload];
    case "Delete":
      return state.filter((item) => item.id !== action.payload.itemId);
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
