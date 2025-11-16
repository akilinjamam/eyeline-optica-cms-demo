import EditWeeklyDeals from "../../components/dashboard/weeklyDeals/AddWeeklyDeals";
import WeeklyDealsLanding from "../../components/dashboard/weeklyDeals/weeklyDealsLanding";

export const weeklyDeals = [
    {
        path: 'weeklyDeals',
        element: <WeeklyDealsLanding/>
    },
    {
        path: 'edit_weeklyDeals',
        element: <EditWeeklyDeals/>
    },
]