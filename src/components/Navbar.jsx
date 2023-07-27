import { NavLink } from "react-router-dom"

import './Navbar.css'

const Navbar = () => {
    return (
        <nav>
            <h1 className="titile">Mini blog</h1>
            <div className="links">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>Produtos</NavLink>
                <NavLink to='/about'>Sobre</NavLink>
            </div>
        </nav>
    )
}

export default Navbar