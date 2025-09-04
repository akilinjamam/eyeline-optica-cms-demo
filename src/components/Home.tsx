import { Outlet } from "react-router-dom";


const Home = () => {
    return (
        <div className="flex">
           
            <Outlet/>
        </div>
            
        
    );
};

export default Home;