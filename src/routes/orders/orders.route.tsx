import FrameOrder from "../../components/dashboard/orders/FrameOrder/FrameOrder";
import OrdersLanding from "../../components/dashboard/orders/OrdersLanding";

export const orders = [       
        {
          path: 'orders',
          element: <OrdersLanding/>
        },        
        {
          path: 'only_frame_order',
          element: <FrameOrder/>
        },        
]