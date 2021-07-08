import React from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie/es6';
import AppConstant from '../Modules/AppConstant';

function Navbar(props) {
    const cookies = new Cookies();
    const log_out = () => {
        Swal.fire({
            title: 'Perhatian',
            text: "Yakin akan log out dari aplikasi?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        })
        .then((result) => {
            if (result.isConfirmed) {
                cookies.remove(AppConstant.APP_COOKIE, { path: "/" });
                cookies.remove(AppConstant.APP_COOKIE_ROLE, { path: "/" });
                document.location.reload();
                // console.log("cookie removed");
            }
        });
    }
    return (
        <header className="header">
                <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-holder d-flex align-items-center justify-content-between">
                        <div className="navbar-header"><a id="toggle-btn" href="#" className="menu-btn"><i className="icon-bars"> </i></a><a href="index.html" className="navbar-brand">
                        <div className="brand-text d-none d-md-inline-block"><span>{`${process.env.REACT_APP_TITLE}`}</span><strong className="text-primary">{" "}SIPABLU</strong></div></a></div>
                        <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                            {/* Notifications dropdown*/}
                            
                            {/* Messages dropdown*/}
                            
                            {/* Languages dropdown    */}
                            
                            {/* Log out*/}
                            <li className="nav-item"><a href="javascript:void(0);" className="nav-link logout" onClick={log_out}> <span className="d-none d-sm-inline-block">Logout</span><i className="fa fa-sign-out"></i></a></li>
                        </ul>
                    </div>
                </div>
                </nav>
            </header>
    );
}

export default Navbar;