import ManageBannerList from "../../components/dashboard/banner/manageBanner/ManageBannerList";
import AccessoryList from "../../components/dashboard/products/AccessoryList/AccessoryList";
import AddAccessory from "../../components/dashboard/products/AddAccessory/AddAccessory";
import AddContactLens from "../../components/dashboard/products/AddContactLens/AddContactLens";
import AddFrame from "../../components/dashboard/products/AddFrame/AddFrame";
import AddLens from "../../components/dashboard/products/AddLense/AddLense";
import { AddCategory } from "../../components/dashboard/products/Category/AddCategory/AddCategory";
import CategoryList from "../../components/dashboard/products/Category/CategoryList/CategoryList";
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
        {
          path: 'add_accessory',
          element: <AddAccessory/>
        },
        {
          path: 'accessory_list',
          element: <AccessoryList/>
        },
        {
          path: 'add_category',
          element: <AddCategory/>
        },
        {
          path: 'category_list',
          element: <CategoryList/>
        },
        // {
        //   path: 'add_banner',
        //   element: <AddBanner/>
        // },
        {
          path: 'manage_banner_list',
          element: <ManageBannerList/>
        },
      ]