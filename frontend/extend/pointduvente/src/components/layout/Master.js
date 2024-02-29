import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../partials/Nav';
import SideBar from '../partials/SideBar';
import Footer from '../partials/Footer';
import Loading from '../modules/Views/Loading';

const Master = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const delay = 100; // Set the delay time for the loading component

    // Show the loading component on route change
    setIsLoading(true);

    // Simulate an asynchronous task, such as fetching data or performing calculations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Clean up the timer on unmount or when the route changes again
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      <Nav />
      <div id="layoutSidenav">
        <SideBar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              {isLoading ? (
                <Loading />
              ) : (
                <Outlet />
              )}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Master;
