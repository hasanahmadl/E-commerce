import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import logo from './icon/adibato.png'
function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product" id="nav-item">Create Product</Link></li>
                <li><Link to="/category" id="nav-item">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history" id="nav-item">History</Link></li>
                <li><Link to="/" onClick={logoutUser} id="nav-item">Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
        
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div>
                <h1>
                    <Link to="/" id="logo"><img src={logo} id="logo"></img></Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/" id="nav-item">{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login" id="nav-item">Login</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon" id="nav-item">
                    <span>{cart.length}</span>
                    <Link to="/cart" id="nav-item-cart">
                     <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
