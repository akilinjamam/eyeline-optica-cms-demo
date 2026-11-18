/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/slices/notificationSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OrderNotification {
  invoiceNo: string;
  customer_name: string;
  payableAmount: number;
  saleType: string;
  createdAt: string;
  isRead: boolean;
  unread?: boolean;
}

interface NotificationState {
  notifications: OrderNotification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<Omit<OrderNotification, any>>,
    ) => {
      const data = action.payload;
      state.notifications = [...(data as any)];
      state.unreadCount += 1;
    },
    markAllAsRead: (state: any) => {
      console.log(state);
      // state.notifications.forEach((n) => (n.unread = false));
      // state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
