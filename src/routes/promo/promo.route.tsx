import AddPromo from "../../components/dashboard/promo/AddPromo/AddPromo";
import PromoLanding from "../../components/dashboard/promo/PromoLanding";
import PromoList from "../../components/dashboard/promo/PromoList/PromoList";

export const promo = [
  {
    path: "promo",
    element: <PromoLanding />,
  },
  {
    path: "add_promo",
    element: <AddPromo />,
  },
  {
    path: "promo_list",
    element: <PromoList />,
  },
];
