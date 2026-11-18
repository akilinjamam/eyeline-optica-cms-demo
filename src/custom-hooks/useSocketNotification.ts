// src/hooks/useSocketNotifications.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { addNotification } from "../app/redux/features/notificationSlice";
import { toast } from "react-toastify";

// const SOCKET_URL = "http://localhost:5000";

export const useSocketNotifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("new_order_notification", (data) => {
      // 1. Update Redux store
      console.log(data);
      dispatch(addNotification(data));

      // 2. Trigger React Toastify alert with custom formatting
      toast.success(`🎉 New Order Received! Invoice: #${data.invoiceNo}`, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // Looks great in an admin dashboard setting
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
