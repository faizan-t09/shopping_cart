export type itemActionTypes =
  | {
      type: "Initialize";
      payload: itemType[];
    }
  | {
      type: "Delete" | "ToggleWishlist";
      payload: { itemId: number };
    }
  | {
      type: "Add";
      payload: itemType;
    };

export const initialItems: itemType[] = [];

export const itemReducer = (state: itemType[], action: itemActionTypes) => {
  switch (action.type) {
    case "Initialize":
      return [...action.payload];
    case "Add":
      return [...state, action.payload];
    case "Delete":
      return state.filter((item) => item.id !== action.payload.itemId);
    case "ToggleWishlist":
      return state.map((item) => {
        if (item.id === action.payload.itemId)
          item.wishlisted = !item.wishlisted;
        return item;
      });
    default:
      return state;
  }
};
