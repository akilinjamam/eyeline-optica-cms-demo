import AccessoryOrder from "../../components/dashboard/orders/AccessoryOrder/AccessoryOrder";
import ContactLensAndAccOrder from "../../components/dashboard/orders/ContactLensAndAccessoryOrder/ContactLensAndAccessoryOrder";
import ContactLensOrder from "../../components/dashboard/orders/ContactLensOrder/ContactLensOrder";
import FrameAndLensOrder from "../../components/dashboard/orders/FrameAndLensOrder/FrameAndLensOrder";
import FrameOrder from "../../components/dashboard/orders/FrameOrder/FrameOrder";
import LensOrder from "../../components/dashboard/orders/LensOrder/LensOrder";
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
        {
          path: 'frame_with_lens_order',
          element: <FrameAndLensOrder/>
        },        
        {
          path: 'only_lens_order',
          element: <LensOrder/>
        },        
        {
          path: 'only_contact_lens_order',
          element: <ContactLensOrder/>
        },        
        {
          path: 'only_accessory_order',
          element: <AccessoryOrder/>
        },        
        {
          path: 'contactLens_and_accessory_order',
          element: <ContactLensAndAccOrder/>
        },        
]