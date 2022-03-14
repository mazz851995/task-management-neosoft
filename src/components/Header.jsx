import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"
import { LOGOUT } from '../actions/actionTypes';

const Header = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const users = useSelector(state => state.userReducer)
    const signedInUser = users.find(user => user.isSignedIn == true);

    const logout = () => {
        dispatch({ type: LOGOUT })
        history.push("/login");
        toast.success("Logged Out Successfully..!!");
    }

    return (
        <header className='mb-3'>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    {
                        signedInUser && signedInUser.proPic ? <img className='profilePic' src={signedInUser.proPic} alt="" /> : ""
                    }
                    <Link to="/home" className="navbar-brand">Welcome {user && user.fullname}</Link>
                    <div className="d-flex">

                        <button className="btn btn-success float-end" onClick={logout} > Logout </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
