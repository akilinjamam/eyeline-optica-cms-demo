import AddContactLens from "../../components/dashboard/products/AddContactLens/AddContactLens";
import AddFrame from "../../components/dashboard/products/AddFrame/AddFrame";
import AddLens from "../../components/dashboard/products/AddLense/AddLense";
import ContactLensList from "../../components/dashboard/products/ContactLensList/ContactLensList";
import FrameList from "../../components/dashboard/products/FrameList/FrameList";
import LensList from "../../components/dashboard/products/LensList/LensList";
import ProductsLanding from "../../components/dashboard/products/ProductsLanding";

export const products = [
       
        {
          path: 'product',
          element: <ProductsLanding/>
        },
        {
          path: 'add_frame',
          element: <AddFrame/>
        },
        {
          path: 'frame_list',
          element: <FrameList/>
        },
        {
          path: 'add_Lens',
          element: <AddLens/>
        },
        {
          path: 'lens_list',
          element: <LensList/>
        },
        {
          path: 'add_contact_Lens',
          element: <AddContactLens/>
        },
        {
          path: 'contact_Lens_list',
          element: <ContactLensList/>
        },
      ]