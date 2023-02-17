const cartAction = {
  initialize: (itemArray: itemType[]) => {
    return { type: "Initialize Cart", payload: itemArray };
  },
  delete: (itemId: number) => {
    return { type: "Delete from Cart", payload: { itemId } };
  },
  IncrementCount: (itemId: number) => {
    return {
      type: "Increament quantity",
      payload: { itemId },
    };
  },
  DecrementCount: (itemId: number) => {
    return {
      type: "Decreament quantity",
      payload: { itemId },
    };
  },
  Add: (item: itemType) => {
    return {
      type: "Add to Cart",
      payload: item,
    };
  },
};
export default cartAction;
