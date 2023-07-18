import React from 'react';
import "./home.css"
import HomeProducts from './components/HomeProducts';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
function HomePage() {
  return (
      <div className="home">
        <div className="homeHeader">
         <span> the best of the best ?</span>
        </div>
        <div className="homeMain">
            <HomeProducts/>
         <Link className={"moreBtnHome"} to={"/products"}><Button className={"moreBtnHome"}  variant="contained">More</Button></Link>
        </div>
      </div>
  );
}

export default HomePage;
