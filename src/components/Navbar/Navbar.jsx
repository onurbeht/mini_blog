import { NavLink } from "react-router-dom"

import { useAuthentication } from "../../hooks/useAuthentication"

import { useAuthValue } from "../../context/authContext"

import styles from './Navbar.module.css'


const Navbar = () => {

    const { user } = useAuthValue();

    const {logout} = useAuthentication();

    return (
        <nav className={styles.navbar}>

            <NavLink to='/' className={styles.brand}>Mini <span>blog</span></NavLink>
            <ul className={styles.navgation}>
                <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
                </li>
                {!user ? (
                    <>
                        <li>
                            <NavLink to='/register' className={({ isActive }) => isActive ? styles.active : ''}>Cadatre-se</NavLink>
                        </li>
                        <li>
                            <NavLink to='/login' className={({ isActive }) => isActive ? styles.active : ''}>Login</NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to='/dashboard' className={({ isActive }) => isActive ? styles.active : ''}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to='/posts/create' className={({ isActive }) => isActive ? styles.active : ''}>Criar post</NavLink>
                        </li>
                    </>
                )}
                <li><NavLink to='/about' className={({ isActive }) => isActive ? styles.active : ''}>Sobre</NavLink></li>

                {user && (<li><button onClick={logout}>Logout</button></li>)}
            </ul>
        </nav>
    )
}

export default Navbar