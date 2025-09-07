import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./components/dashboard/Layout"
import Landing from "./components/dashboard/Landing"
import ProductsLanding from "./components/dashboard/products/ProductsLanding"
import AuthPage from "./components/authPage/AuthPage"
import AddFrame from "./components/dashboard/products/AddFrame/AddFrame"
import FrameList from "./components/dashboard/products/FrameList/FrameList"
import AddLens from "./components/dashboard/products/AddLense/AddLense"
import LensList from "./components/dashboard/products/LensList/LensList"
import AddContactLens from "./components/dashboard/products/AddContactLens/AddContactLens"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthPage/>
    },
    {
      path: '/dashboard',
      element: <Layout/>,
      children: [
        {index: true, element: <Landing/>,},
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
      ]
    },

  ])


  return (
    <>
     <RouterProvider router={router}>

     </RouterProvider>
    </>
  )
}

export default App
