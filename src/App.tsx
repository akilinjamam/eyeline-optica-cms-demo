import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./components/dashboard/Layout"
import AuthPage from "./components/authPage/AuthPage"
import { products } from "./routes/products/products.route"
import Landing from "./components/dashboard/Landing"
import { customers } from "./routes/Customers/customers.route"
import { orders } from "./routes/orders/orders.route"
import { control_user_access } from "./routes/controll-user-access/controllUserAccess.route"
import { doctors } from "./routes/doctor/doctor.route"
import { weeklyDeals } from "./routes/weeklyDeals/weeklyDeals.route"
import { blog } from "./routes/blog/blog.route"
import { wishlist } from "./routes/wishlist/wishlist.route"
// import LoadingGlass from "./reusableComponent/LoadingGlass"

function App() {
  // const token = localStorage.getItem("token");
  // if(!token){
  //   return <LoadingGlass/>
  // }

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
        ...orders,
        ...control_user_access,
        ...doctors,
        ...weeklyDeals,
        ...blog,
        ...wishlist
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
