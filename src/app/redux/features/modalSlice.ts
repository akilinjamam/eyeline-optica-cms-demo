/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContactLens, IFrame, ILens } from "../../../types/interface";
import { toast } from "react-toastify";

interface FrameUIState {
  editProductName: string;
  isEditOpen: boolean;
  isOpenModal: boolean;
  editableData: Partial<IFrame | ILens | ContactLens | any>;
  ids: string[];
  deleteProductName: string;
  showCheck: boolean;
  imgHolder: string[];
  openImgModal: boolean;
  prescriptionData: Partial<any>;
}

const initialState: FrameUIState = {
  isEditOpen: false,
  isOpenModal: false,
  editProductName: "",
  editableData: {},
  ids: [],
  deleteProductName: "",
  showCheck: false,
  imgHolder: [],
  openImgModal: false,
  prescriptionData: {},
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
    setImages(state, action: PayloadAction<string[]>) {
      if (action.payload.length === 0) {
        toast.error("No images added here");
        return;
      }
      state.imgHolder = action.payload;
      state.openImgModal = true;
    },
    closeImgModal(state) {
      state.openImgModal = false;
    },
    addPrescriptionData(state, action: PayloadAction<object>) {
      state.prescriptionData = action.payload;
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
  setImages,
  closeImgModal,
  addPrescriptionData,
} = frameUISlice.actions;
export default frameUISlice.reducer;
