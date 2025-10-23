import CustomerLanding from "../../components/dashboard/customers/CustomerLanding";
import CustomerList from "../../components/dashboard/customers/customerList/CustomerList";

export const customers = [
       
        {
          path: 'customer',
          element: <CustomerLanding/>
        },
        {
          path: 'customer_list',
          element: <CustomerList/>
        },
        
]