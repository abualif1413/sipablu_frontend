import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import InformasiUmumRS from './Pages/InformasiUmumRS';
import MenuManagement from './Pages/MenuManagement';
import PelayananService from './Pages/PelayananService';
import PelayananServiceNew from './Pages/PelayananServiceNew';
import PelayananServiceUpdate from './Pages/PelayananServiceUpdate';
import UploadService from './Pages/UploadService';
import UploadServiceNew from './Pages/UploadServiceNew';
import UploadServiceUpdate from './Pages/UploadServiceUpdate';
import PersonilService from './Pages/PersonilService';
import PersonilServiceNew from './Pages/PersonilServiceNew';
import UserEdit from './Pages/UserEdit';
import UserList from './Pages/UserList';
import UserManagement from './Pages/UserManagement';
import UserType from './Pages/UserType';
import Footer from './Template/Footer';
import Navbar from './Template/Navbar';
import SideNav from './Template/SideNav';
import PersonilServiceUpdate from './Pages/PersonilServiceUpdate';

function Beranda(props) {
    console.log(process.env.PUBLIC_URL);
    return (
        <Router basename={`${process.env.PUBLIC_URL}`}>
            {/* Side Navbar */}
            <SideNav/>
            <div className="page">
                {/* navbar*/}
                <Navbar />
                {/* Breadcrumb*/}
                <div className="breadcrumb-holder">
                    <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Forms</li>
                    </ul>
                    </div>
                </div>
                <section className="forms">
                    <div className="container-fluid">
                        <Switch>
                            <Route path={`${process.env.PUBLIC_URL}/kelompokuser`}><UserType title="Kelompok User" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/kelolauser`}><UserList title="Kelola User" /></Route>
                            <Route exact path={`${process.env.PUBLIC_URL}/tambahuser`}><UserManagement title="Tambah User" /></Route>
                            <Route exact path={`${process.env.PUBLIC_URL}/edituser/:id`}><UserEdit title="Edit User" /></Route>
                            <Route exact path={`${process.env.PUBLIC_URL}/kelolamenu`}><MenuManagement title="Kelola Menu" /></Route>
                            <Route exact path={`${process.env.PUBLIC_URL}/dashboard`}><Dashboard title="Dashboard" /></Route>
                            <Route exact path={`${process.env.PUBLIC_URL}/001_0001`}><InformasiUmumRS title="Informasi Umum" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/upload_service/:tipe`}><UploadService title="" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/upload_service_new/:tipe`}><UploadServiceNew title="" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/upload_service_update/:tipe/:id`}><UploadServiceUpdate title="" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/pelayanan_service/:tipe`}><PelayananService title="" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/pelayanan_service_new/:tipe`}><PelayananServiceNew title="" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/pelayanan_service_update/:tipe/:id`}><PelayananServiceUpdate title="" /></Route>
                            <Route exact path={`${process.env.PUBLIC_URL}/`}><Dashboard title="Dashboard" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/personil_service/:tipe`}><PersonilService title="" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/personil_service_new/:tipe`}><PersonilServiceNew title="" /></Route>
                            <Route path={`${process.env.PUBLIC_URL}/personil_service_update/:tipe/:id`}><PersonilServiceUpdate title="" /></Route>
                            {/* <Route path={`${process.env.PUBLIC_URL}/personil_service_update/:tipe/:id`}><UploadServiceUpdate title="" /></Route> */}
                        </Switch>
                    </div>
                </section>
                <Footer />
            </div>
        </Router>
    );
}

export default Beranda;