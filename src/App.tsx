import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./components/dashboard/Layout"
import Landing from "./components/dashboard/Landing"
import ProductsLanding from "./components/dashboard/products/ProductsLanding"
import AuthPage from "./components/authPage/AuthPage"
import AddFrame from "./components/dashboard/products/AddFrame/AddFrame"

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
        }
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
