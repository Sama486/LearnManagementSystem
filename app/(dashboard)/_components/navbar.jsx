import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from '@/components/navbar-routes'

const Navbar = () => {
    return (
        <div className='p-4 border-b min-h-full flex items-center bg-white'>
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    )
}

export default Navbar