import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./components/dashboard/Layout"
import AuthPage from "./components/authPage/AuthPage"
import { products } from "./routes/products/products.route"
import Landing from "./components/dashboard/Landing"
import { customers } from "./routes/Customers/customers.route"
import { orders } from "./routes/orders/orders.route"

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
        {index: true, element: <Landing/>},
        ...products,
        ...customers,
        ...orders
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
