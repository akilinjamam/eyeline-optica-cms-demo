/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContactLens, IFrame, ILens } from "../../../types/interface";

interface FrameUIState {
  editProductName: string;
  isEditOpen: boolean;
  isOpenModal: boolean;
  editableData: Partial<IFrame | ILens | ContactLens>;
}

const initialState: FrameUIState = {
  isEditOpen: false,
  isOpenModal: false,
  editProductName: "",
  editableData: {},
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
    },
    closeEdit(state) {
      state.isEditOpen = false;
    },
  },
});

export const { openEdit, closeEdit, openModal, closeModal } =
  frameUISlice.actions;
export default frameUISlice.reducer;
