import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie/es6';
import AddButton from '../Component/AddButton';
import Ajax from '../Modules/Ajax';
import AppConstant from '../Modules/AppConstant';

function Login(props) {
    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    const cookies = new Cookies

    const login_attempt = () => {
        setBtnIsLoading(1);
        Ajax.post({
            route: "login_attempt",
            requestBody: {
                email: email,
                password: password
            },
            success: (r) => {
                cookies.set(AppConstant.APP_COOKIE, r.data.token, { path: "/" });
                setBtnIsLoading(0);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil login',
                });
                document.location.reload();
            },
            error: (r) => {
                setBtnIsLoading(0);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: r.data.message,
                });
            }
        })
    }

    return (  
        <div className="page login-page">
            <div className="container">
                <div className="form-outer text-center d-flex align-items-center">
                    <div className="form-inner">
                        <img src={`${process.env.PUBLIC_URL}/perencanaan.png`} alt="biddokkes" className="rounded-circle" width="100px" />
                        <div className="logo text-uppercase"><span>SIPA</span><strong className="text-primary">BLU</strong></div>
                        <p>Sistem Informasi Perencanaan dan Anggaran BLU. Rumah Sakit Bhayangkara Tk II<br />Medan, Sumatera Utara</p>
                        <form method="get" className="text-left form-validate">
                            <div className="form-group-material">
                                <input id="login-username" type="text" required data-msg="Please enter your email" className="input-material" value={email} onChange={(e) => set_email(e.target.value)} />
                                <label className="label-material">Email</label>
                            </div>
                            <div className="form-group-material">
                                <input id="login-password" type="password" required data-msg="Please enter your password" className="input-material" value={password} onChange={(e) => set_password(e.target.value)} />
                                <label className="label-material">Password</label>
                            </div>
                            <div className="form-group text-center">
                                <AddButton addCaption="Login ke dalam aplikasi" editCaption="Login ke dalam aplikasi" posisi={btnAddPosisi} isLoading={btnIsLoading} onClickAdd={login_attempt} fa="fa-key" />
                            </div>
                        </form>
                    </div>
                    <div className="copyrights text-center">
                        <p>Design by <a href="https://bootstrapious.com/p/bootstrap-4-dashboard" className="external">Bootstrapious</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;