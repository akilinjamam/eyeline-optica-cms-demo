/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContactLens, IFrame, ILens } from "../../../types/interface";

interface FrameUIState {
  editProductName: string;
  isEditOpen: boolean;
  isOpenModal: boolean;
  editableData: Partial<IFrame | ILens | ContactLens>;
  ids: string[];
  deleteProductName: string;
  showCheck: boolean;
}

const initialState: FrameUIState = {
  isEditOpen: false,
  isOpenModal: false,
  editProductName: "",
  editableData: {},
  ids: [],
  deleteProductName: "",
  showCheck: false,
};

const frameUISlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEdit(
      state,
      action: PayloadAction<{
        name: string;
        data: IFrame | ILens | ContactLens | any;
      }>
    ) {
      const { name, data } = action.payload;
      state.isEditOpen = true;
      state.editableData = data;
      state.editProductName = name;
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
      state.ids = [];
      state.editProductName = "";
    },
    closeEdit(state) {
      state.isEditOpen = false;
    },

    switchCheck(state) {
      if (state.showCheck) {
        state.showCheck = false;
      } else {
        state.showCheck = true;
      }
    },
    deleteIds(state) {
      state.ids = [];
    },
    addIds(state, action: PayloadAction<string>) {
      state.ids.push(action.payload);
    },
    addAllIds(state, action: PayloadAction<string[]>) {
      state.ids.push(...action.payload);
    },
    removeIds(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((item) => item !== action.payload);
    },
    deletableItem(state, action: PayloadAction<string>) {
      state.deleteProductName = action.payload;
    },
  },
});

export const {
  openEdit,
  closeEdit,
  openModal,
  closeModal,
  switchCheck,
  deleteIds,
  addIds,
  addAllIds,
  removeIds,
  deletableItem,
} = frameUISlice.actions;
export default frameUISlice.reducer;
