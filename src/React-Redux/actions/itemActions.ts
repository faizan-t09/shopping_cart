const itemAction = {
  initialize: (itemArray: itemType[]) => {
    return { type: "Initialize", payload: itemArray };
  },
  delete: (itemId: number) => {
    return { type: "Delete", payload: { itemId } };
  },
  toggleWishList: (itemId: number) => {
    return {
      type: "ToggleWishlist",
      payload: { itemId },
    };
  },
  add: (item: itemType) => {
    return {
      type: "Add",
      payload: item,
    };
  },
};
export default itemAction;