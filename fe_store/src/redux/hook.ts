import {
  TypedUseSelectorHook,
  useDispatch as useBaseDispatch,
  useSelector as useBaseSelector,
} from "react-redux";

import { RootState } from "./rootReducer";
import { AppDispatch } from "./store";

export const useDispatch = (): AppDispatch => useBaseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;
