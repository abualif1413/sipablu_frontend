import React, { useEffect, useState } from 'react';
import {
    Link
  } from "react-router-dom";
import Cookies from 'universal-cookie/es6';
import Ajax from '../Modules/Ajax';
import AppConstant from '../Modules/AppConstant';

function SideNav(props) {

    let cookies = new Cookies();
    const [user, set_user] = useState({});

    const get_user_auth = () => {
        Ajax.get({
            route: "find_auth_user",
            success: (r) => {
                set_user(r.data);
                cookies.set(AppConstant.APP_COOKIE_ROLE, r.data.idKelompokPengguna, { path: '/' })
                console.log(r);
            }
        });
    }

    useEffect(() => {
        get_user_auth();
    }, [])

    return (
        <nav className="side-navbar">
            <div className="side-navbar-wrapper">
                {/* Sidebar Header    */}
                <div className="sidenav-header d-flex align-items-center justify-content-center">
                {/* User Info*/}
                <div className="sidenav-header-inner text-center"><img src={`${process.env.PUBLIC_URL}/perencanaan.png`} alt="biddokkes" className="img-fluid rounded-circle" />
                    <h2 className="h5">{user.name ?? ""}</h2><span>{user.email ?? ""}</span>
                </div>
                {/* Small Brand information, appears on minimized sidebar*/}
                <div className="sidenav-header-logo"><a href="index.html" className="brand-small text-center"> <strong>B</strong><strong className="text-primary">D</strong></a></div>
                </div>
                {/* Sidebar Navigation Menus*/}
                <div className="admin-menu">
                    <h5 className="sidenav-heading">SETTING Aplikasi</h5>
                    <ul id="side-admin-menu" className="side-menu list-unstyled"> 
                        <li><Link to="/kelompokuser"><i className="icon-screen"></i>Kelompok User</Link></li>
                        <li><Link to="/kelolauser"><i className="fa fa-user"></i>Kelola User</Link></li>
                    </ul>
                </div>
                <div className="admin-menu">
                    <h5 className="sidenav-heading">MENU APLIKASI</h5>
                    <ul id="side-admin-menu" className="side-menu list-unstyled"> 
                        <li><Link to="/dashboard"><i className="fa fa-dashboard"></i>Dashboard</Link></li>
                        <li><Link to="/001_0001"><i className="fa fa-file"></i>Informasi Umum</Link></li>
                        <li><a href="#dd_organisasi" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Organisasi</a>
                            <ul id="dd_organisasi" className="collapse list-unstyled ">
                                <li><Link to="/upload_service/sejarah_singkat"><i className="fa fa-file"></i>Sejarah singkat</Link></li>
                                <li><Link to="/upload_service/visi"><i className="fa fa-file"></i>Visi</Link></li>
                                <li><Link to="/upload_service/misi"><i className="fa fa-file"></i>Misi</Link></li>
                                <li><Link to="/upload_service/moto"><i className="fa fa-file"></i>Moto</Link></li>
                                <li><Link to="/upload_service/tujuan"><i className="fa fa-file"></i>Tujuan</Link></li>
                                <li><Link to="/upload_service/swot"><i className="fa fa-file"></i>SWOT</Link></li>
                                <li><Link to="/upload_service/logo"><i className="fa fa-file"></i>Logo / Struktur</Link></li>
                                <li><Link to="/upload_service/sistem_aplikasi"><i className="fa fa-file"></i>Sistem Aplikasi</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_perencanaan" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Perencanaan</a>
                            <ul id="dd_perencanaan" className="collapse list-unstyled ">
                                <li><Link to="/upload_service/renstra"><i className="fa fa-file"></i>RENSTRA</Link></li>
                                <li><Link to="/upload_service/rsb"><i className="fa fa-file"></i>RSB</Link></li>
                                <li><Link to="/upload_service/renja"><i className="fa fa-file"></i>RENJA</Link></li>
                                <li><Link to="/upload_service/rba"><i className="fa fa-file"></i>RBA</Link></li>
                                <li><Link to="/upload_service/iku"><i className="fa fa-file"></i>IKU</Link></li>
                                <li><Link to="/upload_service/perjanjian_kinerja"><i className="fa fa-file"></i>Perjanjian Kinerja</Link></li>
                                <li><Link to="/upload_service/rkt"><i className="fa fa-file"></i>RKT</Link></li>
                                <li><Link to="/upload_service/dipa"><i className="fa fa-file"></i>DIPA</Link></li>
                                <li><Link to="/upload_service/kertas_kerja"><i className="fa fa-file"></i>Kertas Kerja</Link></li>
                                <li><Link to="/upload_service/tor"><i className="fa fa-file"></i>TOR / RAB</Link></li>
                                <li><Link to="/upload_service/justifikasi"><i className="fa fa-file"></i>Justifikasi Proposal Target</Link></li>
                                <li><Link to="/upload_service/spm"><i className="fa fa-file"></i>SPM</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_sdm" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>SDM</a>
                            <ul id="dd_sdm" className="collapse list-unstyled ">
                                <li><Link to="/personil_service/polri"><i className="fa fa-file"></i>POLRI</Link></li>
                                <li><Link to="/personil_service/asn"><i className="fa fa-file"></i>ASN</Link></li>
                                <li><Link to="/personil_service/tkk"><i className="fa fa-file"></i>TKK</Link></li>
                                <li><Link to="/personil_service/mitra"><i className="fa fa-file"></i>MITRA</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_pelayanan" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Pelayanan</a>
                            <ul id="dd_pelayanan" className="collapse list-unstyled ">
                                <li><Link to="/pelayanan_service/rj"><i className="fa fa-file"></i>Rawat Jalan</Link></li>
                                <li><Link to="/pelayanan_service/ri"><i className="fa fa-file"></i>Rawat Inap</Link></li>
                                <li><Link to="/pelayanan_service/lab"><i className="fa fa-file"></i>Laboratorium</Link></li>
                                <li><Link to="/pelayanan_service/rad"><i className="fa fa-file"></i>Radiologi</Link></li>
                                <li><Link to="/pelayanan_service/bed"><i className="fa fa-file"></i>Bedah</Link></li>
                                <li><Link to="/pelayanan_service/igd"><i className="fa fa-file"></i>IGD</Link></li>
                                <li><Link to="/pelayanan_service/reh"><i className="fa fa-file"></i>Rehab Medik</Link></li>
                                <li><Link to="/pelayanan_service/end"><i className="fa fa-file"></i>Endoscopy</Link></li>
                                <li><Link to="/pelayanan_service/hem"><i className="fa fa-file"></i>Hemodialisa</Link></li>
                                <li><Link to="/pelayanan_service/poli"><i className="fa fa-file"></i>Poliklinik</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_keuangan" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Data Keuangan</a>
                            <ul id="dd_keuangan" className="collapse list-unstyled ">
                                <li><Link to="/upload_service/calk"><i className="fa fa-file"></i>CALK</Link></li>
                                <li><Link to="/upload_service/penerimaan"><i className="fa fa-file"></i>Data Penerimaan</Link></li>
                                <li><Link to="/upload_service/lra"><i className="fa fa-file"></i>LRA</Link></li>
                                <li><Link to="/upload_service/lo"><i className="fa fa-file"></i>LO</Link></li>
                                <li><Link to="/upload_service/gaji_polri"><i className="fa fa-file"></i>Gaji Polri</Link></li>
                                <li><Link to="/upload_service/gaji_asn"><i className="fa fa-file"></i>Gaji ASN</Link></li>
                                <li><Link to="/upload_service/gaji_tkk"><i className="fa fa-file"></i>Gaji TKK</Link></li>
                                <li><Link to="/upload_service/gaji_mitra"><i className="fa fa-file"></i>Gaji Mitra</Link></li>
                                <li><Link to="/upload_service/lap_pengeluaran"><i className="fa fa-file"></i>Laporan Pengeluaran</Link></li>
                                <li><Link to="/upload_service/klaim_bpjs"><i className="fa fa-file"></i>Klaim BPJS</Link></li>
                                <li><Link to="/upload_service/klaim_covid_pasien"><i className="fa fa-file"></i>Klaim Covid Pasien</Link></li>
                                <li><Link to="/upload_service/klaim_insentif_nakes"><i className="fa fa-file"></i>Klaim Insentif Nakes</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_kinerja" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Pengelolaan Kinerja</a>
                            <ul id="dd_kinerja" className="collapse list-unstyled ">
                                <li><Link to="/upload_service/ikt"><i className="fa fa-file"></i>IKT</Link></li>
                                <li><Link to="/upload_service/ikl_bor"><i className="fa fa-file"></i>IKL - BOR</Link></li>
                                <li><Link to="/upload_service/ikl_los"><i className="fa fa-file"></i>IKL - LOS</Link></li>
                                <li><Link to="/upload_service/ikl_bto"><i className="fa fa-file"></i>IKL - BTO</Link></li>
                                <li><Link to="/upload_service/ikl_toi"><i className="fa fa-file"></i>IKL - TOI</Link></li>
                                <li><Link to="/upload_service/ikl_ndr"><i className="fa fa-file"></i>IKL - NDR</Link></li>
                                <li><Link to="/upload_service/ikl_gdr"><i className="fa fa-file"></i>IKL - GDR</Link></li>
                                <li><Link to="/upload_service/ik_rkb"><i className="fa fa-file"></i>Rasio Kas BLU</Link></li>
                                <li><Link to="/upload_service/ik_pobo"><i className="fa fa-file"></i>Rasio POBO</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_dewas" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Dewas</a>
                            <ul id="dd_dewas" className="collapse list-unstyled ">
                                <li><Link to="/upload_service/lap_dewas"><i className="fa fa-file"></i>Laporan Dewas</Link></li>
                                <li><Link to="/upload_service/dok_dewas"><i className="fa fa-file"></i>Dokumentasi</Link></li>
                                <li><Link to="/upload_service/surat_dewas"><i className="fa fa-file"></i>Surat-surat</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_tarif" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Tarif</a>
                            <ul id="dd_tarif" className="collapse list-unstyled ">
                                <li><Link to="/upload_service/pmk_tarif"><i className="fa fa-file"></i>PMK Tarif</Link></li>
                                <li><Link to="/upload_service/usulan_tarif"><i className="fa fa-file"></i>Usulan Tarif</Link></li>
                                <li><Link to="/upload_service/dok_tarif"><i className="fa fa-file"></i>Dokumentasi</Link></li>
                            </ul>
                        </li>

                        <li><a href="#dd_dokpol" aria-expanded="false" data-toggle="collapse"><i className="fa fa-list"></i>Dokpol</a>
                            <ul id="dd_dokpol" className="collapse list-unstyled ">
                                <li><Link to="/upload_service/dokpol_wattah"><i className="fa fa-file"></i>Wattah</Link></li>
                                <li><Link to="/upload_service/dokpol_yankes"><i className="fa fa-file"></i>Yankes</Link></li>
                            </ul>
                        </li>

                        <li><Link to="/upload_service/dokumentasi"><i className="fa fa-file"></i>Dokumentasi</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default SideNav;