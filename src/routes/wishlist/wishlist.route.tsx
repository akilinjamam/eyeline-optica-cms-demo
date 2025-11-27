import WishlistContactLens from "../../components/dashboard/wishlist/wishlistContactLens/WishContactLens";
import WishlistFrame from "../../components/dashboard/wishlist/wishlistFrame/WishlistFrame";
import WishlistLanding from "../../components/dashboard/wishlist/wishlistLanding";
import WishlistLens from "../../components/dashboard/wishlist/wishlistLens/WishlistLens";


export const wishlist = [
    {
        path: 'wishlist',
        element: <WishlistLanding/>
    },
    {
        path: 'wishlist_frame',
        element: <WishlistFrame/>
    },
    {
        path: 'wishlist_lens',
        element: <WishlistLens/>
    },
    {
        path: 'wishlist_contactLens',
        element: <WishlistContactLens/>
    },
]