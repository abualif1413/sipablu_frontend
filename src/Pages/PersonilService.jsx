import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie/es6';
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';
import AppConstant from '../Modules/AppConstant';

function PersonilService(props) {
    const [personil_service, set_personil_service] = useState({});
    const [all_personil, set_all_personil] = useState([]);
    const [src_tgl_dari, set_src_tgl_dari] = useState("");
    const [src_tgl_sampai, set_src_tgl_sampai] = useState("");
    const [paginations, set_paginations] = useState([]);
    const [current_page, set_current_page] = useState(0);
    const [total_data, set_total_data] = useState(0);
    const [loading_data, set_loading_data] = useState(false);

    let cookies = new Cookies();
    let history = useHistory();
    let { tipe } = useParams();

    const find_service = () => {
        Ajax.get({
            route: `personil_service/${tipe}`,
            success: (r) => {
                set_personil_service(r.data);
            }
        })
    }

    const get_all_personil = (page = 1) => {
        if(src_tgl_dari !== "" && src_tgl_sampai !== "") {
            set_loading_data(true);
            Ajax.get({
                route: `personil/all/${tipe}?dari=${src_tgl_dari}&sampai=${src_tgl_sampai}&page=${page}`,
                success: (r) => {
                    set_loading_data(false);
                    set_all_personil(r.data.data);
                    set_paginations(r.data.links);
                    set_current_page(r.data.current_page);
                    set_total_data(r.data.total);
                }
            })
        }
    }

    let add_new = () => {
        history.push("/personil_service_new/" + tipe);
    }

    const update_data = (id) => {
        history.push("/personil_service_update/" + tipe + "/" + id);
    }

    const delete_data = (id) => {
        Swal.fire({
            title: 'Perhatian',
            text: "Yakin akan menghapus data ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        })
        .then((result) => {
            if(result.isConfirmed) {
                Ajax.get({
                    route: "delete_pasien/" + id,
                    success: (r) => {
                        Swal.fire({
                            title: 'Informasi',
                            text: "Data telah dihapus",
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33'
                        })
                        get_all_personil();
                    }
                })
            }
        })
    }

    const DataUploadShow = (props) => {
        return (
            <li className="clearfix">
                <div className="feed d-flex justify-content-between">
                    <div className="feed-body d-flex justify-content-between">
                        <a href="#" className="feed-profile">
                            {/* <i className="fa fa-file fa-lg"></i> */}
                            <img src={`${Ajax.be_url()}/public/icons/${tipe}.png`} />
                        </a>
                        <div className="content"><strong style={{fontWeight: "bold"}}>{props.nama}</strong><small>{props.catatan}</small>
                            <div className="full-date"><small>Jabatan : {props.jabatan}</small></div>
                            <div className="full-date"><small><strong style={{color: "#a6a61a", fontWeight: "bold"}}>Pangkat : {props.pangkat}</strong></small></div>
                            <div className="CTAs">
                                {
                                    (cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_SDM || cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_SA) ?
                                    <>
                                        <button className="btn btn-xs btn-success" onClick={() => update_data(props.id)}><i className="fa fa-pencil"> </i>{" "}Edit data</button>{" "}
                                        <button className="btn btn-xs btn-danger" onClick={() => delete_data(props.id)}><i className="fa fa-trash"> </i>{" "}Hapus data</button>
                                    </> : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="date">
                        {
                            (tipe === "ri") ? <small>Ruangan : {props.ruangan}</small> :
                                (tipe === "poli") ? <small>Ruangan : {props.poliklinik}</small> : ""
                        }
                    </div>
                </div>
            </li>
        )
    }

    const NoDataUploadFound = (props) => {
        return (
            <li className="clearfix">
                <div className="feed d-flex justify-content-between">
                    <div className="feed-body d-flex justify-content-between"><a href="#" className="feed-profile"><i className="fa fa-warning fa-lg"></i></a>
                    <div className="content"><strong style={{fontWeight: "bold"}}>Tidak ada data</strong><small>Tidak ada data {personil_service.judul} ditemukan</small>
                        {/* <div className="full-date"><small>Today 5:60 pm - 12.06.2014</small></div> */}
                        <div className="full-date"><small></small></div>
                        <div className="CTAs"></div>
                    </div>
                    </div>
                    <div className="date"><small>Silahkan input data terlebih dahulu</small></div>
                </div>
            </li>
        )
    }

    const LoadingDataUpload = (props) => {
        return (
            <li className="clearfix">
                <div className="feed d-flex justify-content-between">
                    <div className="feed-body d-flex justify-content-between"><a href="#" className="feed-profile"><i className="fa fa-spin fa-spinner fa-lg"></i></a>
                    <div className="content"><strong style={{fontWeight: "bold"}}>Loading ...</strong><small>Loading ...</small>
                        {/* <div className="full-date"><small>Today 5:60 pm - 12.06.2014</small></div> */}
                        <Skeleton width="500px" height="40px" />
                        <div style={{height: "5px"}}></div>
                        <Skeleton width="500px" height="10px" />
                    </div>
                    </div>
                </div>
            </li>
        )
    }

    useEffect(() => {
        find_service();
        const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
        const endOfMonth   = moment().clone().endOf('month').format('YYYY-MM-DD');
        set_src_tgl_dari(startOfMonth);
        set_src_tgl_sampai(endOfMonth);
        get_all_personil();
    }, [tipe]);

    useEffect(() => {
        get_all_personil();
    }, [src_tgl_dari, src_tgl_sampai]);

    return (
        <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            <header> 
                <h1 className="h3 display">{personil_service.judul ?? ""}</h1>
            </header>

            <div className="row">
                <div className="col-lg-12">
                    {
                        (cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_SDM || cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_SA) ?
                            <button className="btn btn-primary btn-sm" onClick={add_new}><i className="fa fa-file"></i>{" "}{`Tambah Data Personil ${personil_service.judul}`}</button> : <></>
                    }
                    <br /><br />
                    <Card title="Filter Data">
                        <form>
                            <div className="row">
                                <div className="form-group col-lg-3">
                                    <label>Dari (Tgl. Aktif)</label>
                                    <input type="date" className="form-control" value={src_tgl_dari} onChange={(e) => set_src_tgl_dari(e.target.value)} />
                                </div>
                                <div className="form-group col-lg-3">
                                    <label>Sampai (Tgl. Aktif)</label>
                                    <input type="date" className="form-control" value={src_tgl_sampai} onChange={(e) => set_src_tgl_sampai(e.target.value)} />
                                </div>
                            </div>
                        </form>
                        <hr />
                        <button className="btn btn-success btn-sm" onClick={get_all_personil}><i className="fa fa-search"></i>{' '}Filter data</button>
                    </Card>
                    <div id="new-updates" className="card updates daily-feeds">
                        <div id="updates-header" className="card-header d-flex justify-content-between align-items-center">
                            <h2 style={{fontWeight: "bold !important"}}>
                                <a data-toggle="collapse" data-parent="#new-updates" href="#updates-box" aria-expanded="true" aria-controls="updates-box">{`Daftar Personil : ${personil_service.judul ?? ""}`}</a>
                            </h2><a>Total data : {(loading_data === true) ? "" : total_data}</a>
                        </div>
                        <div role="tabpanel" className="collapse show">
                            <div className="feed-box">
                                <ul className="feed-elements list-unstyled">
                                    {
                                        (loading_data === true) ?
                                            <>
                                                <LoadingDataUpload />
                                                <LoadingDataUpload />
                                                <LoadingDataUpload /> : 
                                            </> :
                                            (all_personil.length > 0) ?
                                                all_personil.map((p) => {
                                                    return <DataUploadShow key={p.id_personil} nama={p.nama} jabatan={p.jabatan}
                                                                pangkat={p.pangkat}
                                                                id={p.id_personil} />
                                                }) : <NoDataUploadFound />
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {
                                paginations.map((p) => {
                                    let disabled = (p.url === null) ? "disabled" : "";
                                    let active = (p.active) ? "active" : "";
                                    let page_to_click = p.label;
                                    if(p.label === "&laquo; Previous")
                                        page_to_click = parseInt(current_page) - 1;
                                    if(p.label === "Next &raquo;")
                                        page_to_click = parseInt(current_page) + 1;
                                    
                                    return (
                                        <li key={p.label} className={`page-item ${active} ${disabled}`}>
                                            <a className="page-link" href="javascript:void(0);" onClick={() => get_all_personil(page_to_click)}
                                                dangerouslySetInnerHTML={{__html: `${p.label}`}}></a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </motion.div>
    );
}

export default PersonilService;