import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Card from '../Component/Card';
import { useHistory, useParams } from 'react-router';
import Ajax from '../Modules/Ajax';
import moment from 'moment';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import Cookies from 'universal-cookie/es6';
import AppConstant from '../Modules/AppConstant';

UploadService.propTypes = {
    
};

function UploadService(props) {
    let history = useHistory();
    let { tipe } = useParams();
    let cookies = new Cookies();

    const [src_tgl_dari, set_src_tgl_dari] = useState("");
    const [src_tgl_sampai, set_src_tgl_sampai] = useState("");
    const [upload_service, set_upload_service] = useState({});
    const [data_upload, set_data_upload] = useState([]);
    const [paginations, set_paginations] = useState([]);
    const [current_page, set_current_page] = useState(0);
    const [total_data, set_total_data] = useState(0);
    const [loading_data, set_loading_data] = useState(false);

    let add_new = () => {
        history.push("/upload_service_new/" + tipe);
    }

    const update_data = (id) => {
        history.push("/upload_service_update/" + tipe + "/" + id);
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
                    route: "delete_data_upload/" + id,
                    success: (r) => {
                        Swal.fire({
                            title: 'Informasi',
                            text: "Data telah dihapus",
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33'
                        })
                        load_data();
                    }
                })
            }
        })
    }

    const load_data = (page = 1) => {
        if(src_tgl_dari !== "" || src_tgl_sampai !== "") {
            set_loading_data(true);
            Ajax.get({
                route: "get_data_upload/" + tipe + "?dari=" + src_tgl_dari + "&sampai=" + src_tgl_sampai + "&page=" + page,
                success: (r) => {
                    set_loading_data(false);
                    set_data_upload(r.data.data);
                    set_paginations(r.data.links);
                    set_current_page(r.data.current_page);
                    set_total_data(r.data.total);
                }
            });
        }
    }

    useEffect(() => {
        Ajax.get({
            route: "upload_service/" + tipe,
            success: (r) => {
                set_upload_service(r.data);
            }
        });

        const startOfMonth = moment('1980-01-01').format('YYYY-MM-DD');
        const endOfMonth   = moment().clone().endOf('month').format('YYYY-MM-DD');
        set_src_tgl_dari(startOfMonth);
        set_src_tgl_sampai(endOfMonth);
        
        load_data();
    }, [tipe]);

    useEffect(() => {
        load_data();
    }, [src_tgl_dari, src_tgl_sampai])

    const DataUploadShow = (props) => {
        return (
            <li className="clearfix">
                <div className="feed d-flex justify-content-between">
                    <div className="feed-body d-flex justify-content-between"><a href="#" className="feed-profile"><i className="fa fa-file fa-lg"></i></a>
                    <div className="content"><strong style={{fontWeight: "bold"}}>{props.judul}</strong><small>{props.keterangan}</small>
                        {/* <div className="full-date"><small>Today 5:60 pm - 12.06.2014</small></div> */}
                        <div className="full-date"><small>Uploaded at : {moment(props.upload_date).format("dddd DD MMMM YYYY on HH:mm")}</small></div>
                        <div className="CTAs">
                            <a href={Ajax.be_url() + "/public/uploads/" + props.nama_file} target="_blank" className="btn btn-xs btn-success"><i className="fa fa-download"> </i>{" "}Download file ini</a>{" "}
                            {
                                (cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_RENMIN || cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_SA) ?
                                    <>
                                        <button className="btn btn-xs btn-success" onClick={() => update_data(props.id)}><i className="fa fa-pencil"> </i>{" "}Edit data</button>{" "}
                                        <button className="btn btn-xs btn-danger" onClick={() => delete_data(props.id)}><i className="fa fa-trash"> </i>{" "}Hapus data</button>
                                    </> : <></>
                            }
                        </div>
                    </div>
                    </div>
                    <div className="date"><small>Doc date : {moment(props.tanggal).format("DD MMMM YYYY")}</small></div>
                </div>
            </li>
        )
    }

    const NoDataUploadFound = (props) => {
        return (
            <li className="clearfix">
                <div className="feed d-flex justify-content-between">
                    <div className="feed-body d-flex justify-content-between"><a href="#" className="feed-profile"><i className="fa fa-warning fa-lg"></i></a>
                    <div className="content"><strong style={{fontWeight: "bold"}}>Tidak ada data</strong><small>Tidak ada data {upload_service.judul} ditemukan</small>
                        {/* <div className="full-date"><small>Today 5:60 pm - 12.06.2014</small></div> */}
                        <div className="full-date"><small></small></div>
                        <div className="CTAs"></div>
                    </div>
                    </div>
                    <div className="date"><small>Silahkan upload data terlebih dahulu</small></div>
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

    return (
        <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            <header> 
                <h1 className="h3 display">{upload_service.judul}</h1>
            </header>

            <div className="row">
                <div className="col-lg-12">
                    {
                        (cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_RENMIN || cookies.get(AppConstant.APP_COOKIE_ROLE) === process.env.REACT_APP_ROLE_SA) ?
                            <button className="btn btn-primary btn-sm" onClick={add_new}><i className="fa fa-file"></i>{" "}{`Tambah Data ${upload_service.judul}`}</button> : <></>
                    }
                    <br /><br />
                    <Card title="Filter Data">
                        <form>
                            <div className="row">
                                <div className="form-group col-lg-3">
                                    <label>Dari (Tgl. Berkas)</label>
                                    <input type="date" className="form-control" value={src_tgl_dari} onChange={(e) => set_src_tgl_dari(e.target.value)} />
                                </div>
                                <div className="form-group col-lg-3">
                                    <label>Sampai (Tgl. Berkas)</label>
                                    <input type="date" className="form-control" value={src_tgl_sampai} onChange={(e) => set_src_tgl_sampai(e.target.value)} />
                                </div>
                            </div>
                        </form>
                        <hr />
                        <button className="btn btn-success btn-sm" onClick={load_data}><i className="fa fa-search"></i>{' '}Filter data</button>
                    </Card>
                    <div id="new-updates" className="card updates daily-feeds">
                        <div id="updates-header" className="card-header d-flex justify-content-between align-items-center">
                            <h2 style={{fontWeight: "bold !important"}}>
                                <a data-toggle="collapse" data-parent="#new-updates" href="#updates-box" aria-expanded="true" aria-controls="updates-box">{`Daftar Berkas : ${upload_service.judul ?? ""}`}</a>
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
                                            (data_upload.length === 0) ?
                                                <NoDataUploadFound /> :
                                                data_upload.map((data) => {
                                                    return <DataUploadShow key={data.id_data_upload} id={data.id_data_upload} judul={data.judul} keterangan={data.keterangan}
                                                            tanggal={data.tanggal} upload_date={data.updated_at}
                                                            nama_file={data.nama_file} />
                                                })
                                        

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
                                    console.log(page_to_click);
                                    return (
                                        <li className={`page-item ${active} ${disabled}`}>
                                            <a className="page-link" href="javascript:void(0);" onClick={() => load_data(page_to_click)}
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

export default UploadService;