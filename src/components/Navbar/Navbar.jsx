import { NavLink } from "react-router-dom"

import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>

            <NavLink to='/' className={styles.brand}>Mini <span>blog</span></NavLink>
            <ul className={styles.navgation}>
                <li>
                    <NavLink to='/' className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/register' className={({isActive}) => isActive ? styles.active : ''}>Cadatre-se</NavLink>

                </li>
                <li><NavLink to='/about' className={({isActive}) => isActive ? styles.active : ''}>Sobre</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar