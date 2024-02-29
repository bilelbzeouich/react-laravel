import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../partials/Nav'
import SideBar from '../partials/SideBar'
import Footer from '../partials/Footer'

const Master = () => {
  return (
    <div>
      <Nav />
      <div id="layoutSidenav">
        <SideBar />
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">
              <Outlet />

            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Master