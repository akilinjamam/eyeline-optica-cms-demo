/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, Delete } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../app/store";
// import { markAllAsRead } from "../app/redux/features/notificationSlice";
import {
  useGetAllSalesForNotificationQuery,
  useUpdateUnreadMutation,
} from "../app/redux/api/salesApi";
import { useNavigate } from "react-router-dom";
import type { TRoll } from "../components/dashboard/Dashboard";
import { useGetAllUsersQuery } from "../app/redux/api/authApi";
import { decodeToken } from "../utils/decodeToken";

type NotificationItem = {
  _id: string;
  invoiceNo: string;
  payableAmount: number;
  customer_name: string;
  saleType: string;
  unread?: boolean;
};

export const NotificationDropdown = () => {
  const token = localStorage.getItem("token");
  const decoded = decodeToken(token as string);
  const { data: allUsers } = useGetAllUsersQuery("");
  const findusers = allUsers?.data?.find(
    (user: any) => user?.email === decoded?.email,
  );
  const roll = findusers?.role as TRoll;

  const { data: saleData } = useGetAllSalesForNotificationQuery("") as any;
  const [unreadSale] = useUpdateUnreadMutation();

  const notifications: NotificationItem[] = Array.isArray(saleData?.data?.data)
    ? saleData?.data?.data?.filter((item: any) => item?.unread === true)
    : [];
  const allUnreads = notifications?.length;

  const handleUnread = async (id: string) => {
    console.log(id);
    const data = {
      id: id,
    };
    try {
      await unreadSale(data as any);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleRoute = (saleType: string) => {
    if (saleType === "Only Frame") {
      navigate("/dashboard/only_frame_order");
    }
    if (saleType === "Frame and Lens") {
      navigate("/dashboard/frame_with_lens_order");
    }
    if (saleType === "Only Lens") {
      navigate("/dashboard/only_lens_order");
    }
    if (saleType === "Only Contact-Lens") {
      navigate("/dashboard/only_contact_lens_order");
    }
    if (saleType === "Only Accessory") {
      navigate("/dashboard/only_accessory_order");
    }
    if (saleType === "Contact-Lens and Accessory") {
      navigate("/dashboard/contactLens_and_accessory_order");
    }
  };

  return (
    <DropdownMenu>
      {roll !== "marketer" && (
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell
              style={{ color: "orangered", width: "20px", height: "20px" }}
            />
            {allUnreads > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white animate-pulse">
                {allUnreads}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent align="end" className="w-80 p-2">
        <div className="flex items-center justify-between border-b pb-2 mb-2 px-2">
          <h4 className="font-semibold text-sm">Order Notifications</h4>
          {/* {allUnreads > 0 && (
            <button
              // onClick={() => dispatch(markAllAsRead())}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          )} */}
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1">
          {Array.isArray(notifications) && notifications.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground py-4">
              No new orders yet.
            </p>
          ) : (
            <AnimatePresence initial={false}>
              {Array.isArray(notifications) &&
                notifications.map((notification) => (
                  <motion.div
                    key={notification.invoiceNo}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuItem
                      className={`flex flex-col items-start p-2 cursor-pointer ${notification.unread ? "bg-muted/50" : ""}`}
                    >
                      <div className="flex justify-between w-full text-xs font-medium">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnread(notification?._id);
                          }}
                          className="flex items-center hover:text-red-500"
                        >
                          <Delete className="text-red-500 cursor-pointer" />
                          <p className="ml-2">
                            Invoice: #{notification.invoiceNo}
                          </p>
                        </div>
                        <span className="text-primary font-bold">
                          ৳{notification.payableAmount}
                        </span>
                      </div>
                      <p
                        onClick={() => handleRoute(notification?.saleType)}
                        className="text-xs text-muted-foreground mt-0.5 hover:text-blue-400 "
                      >
                        {notification.customer_name} —{" "}
                        <span className="italic">{notification.saleType}</span>
                      </p>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
            </AnimatePresence>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
