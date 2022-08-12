type StateType = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

type ActionType = {
  type: "SET_TITLE" | "SET_DESCRIPTION" | "SET_BODY" | "ADD_TAG" | "REMOVE_TAG";
  text?: string;
  tag?: string;
};
const editorReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        title: action.text,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.text,
      };
    case "SET_BODY":
      return {
        ...state,
        body: action.text,
      };
    case "ADD_TAG":
      return {
        ...state,
        tagList: state.tagList.concat(action.tag),
      };
    case "REMOVE_TAG":
      return {
        ...state,
        tagList: state.tagList.filter((tag) => tag !== action.tag),
      };
    default:
      throw new Error("Unhandled action");
  }
};

export default editorReducer;
