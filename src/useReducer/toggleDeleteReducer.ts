export type delActionType = {
  type: "Toggle";
};

export const initialDel: boolean = false;

export const delReducer = (state: boolean, action: delActionType) => {
  switch (action.type) {
    case "Toggle":
      return !state;
    default:
      return state;
  }
};
