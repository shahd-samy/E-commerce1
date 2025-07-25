import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className='container py-15'>
                <Outlet />

            </div>
            <Footer />
        </>
    )
}
