import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./components/dashboard/Layout"
import Landing from "./components/dashboard/Landing"
import ProductsLanding from "./components/dashboard/products/ProductsLanding"
import AuthPage from "./components/authPage/AuthPage"

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
