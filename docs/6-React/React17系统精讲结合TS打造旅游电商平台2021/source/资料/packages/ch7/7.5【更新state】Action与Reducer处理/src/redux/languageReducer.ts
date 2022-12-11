export interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

export default (state = defaultState, action) => {
  console.log(state, action)
  if(action.type === "change_language"){
    const newState = { ...state, language: action.payload };
    return newState;
  }
  return state;
};
