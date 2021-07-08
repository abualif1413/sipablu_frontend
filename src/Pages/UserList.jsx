import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';
import { useHistory } from 'react-router';
import Skeleton from 'react-loading-skeleton';

function UserList(props) {
    const [listKelompok, setListKelompok] = useState([]);
    const [loadingKelompok, setLoadingKelompok] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [idKelompok, setIdKelompok] = useState(0);
    const [search, setSearch] = useState("");
    const [listUser, setListUser] = useState([]);

    const history = useHistory();

    const CardUser = (props) => {
        return (
            <motion.div
                initial = {{opacity: 0}}
                animate = {{opacity: 1}}
                exit = {{opacity: 0}}
            >
                <li className="clearfix">
                    <div className="feed d-flex justify-content-between">
                        <div className="feed-body d-flex justify-content-between"><a href="#" className="feed-profile">
                            <img src="https://picsum.photos/seed/picsum/300/200" className="img-fluid rounded-circle" /></a>
                            <div className="content">
                                <strong>{props.email}</strong><small>{props.nama}</small>
                                <div className="CTAs">
                                    <button className="btn btn-xs btn-primary" onClick={props.onClickEdit}><i className="fa fa-edit"> </i>{' '}Edit</button>
                                    {' '}
                                    <button className="btn btn-xs btn-warning"><i className="fa fa-trash"> </i>{' '}Delete</button>
                                    {' '}
                                    <button className="btn btn-xs btn-dark"><i className="fa fa-ban"> </i>{' '}Blokir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </motion.div>
        )
    }

    const SkeletonUser = (props) => {
        return (
            <motion.div
                initial = {{opacity: 0}}
                animate = {{opacity: 1}}
                exit = {{opacity: 0}}
            >
                <li className="clearfix">
                    <div className="feed d-flex justify-content-between">
                        <div className="feed-body d-flex justify-content-between">
                            <div className="content">
                                <Skeleton width={200} height={20} count={2} />
                            </div>
                        </div>
                    </div>
                </li>
            </motion.div>
        )
    }

    const loadKelompok = () => {
        setLoadingKelompok(true);
        Ajax.post({
            route: "kelompokpengguna/all",
            success: (r) => {
                let temp = {
                    idKelompokPengguna: 0,
                    kelompokPengguna: "Semua tipe user",
                    keterangan: "",
                    changeTime: ""
                };
                let banned = {
                    idKelompokPengguna: 999,
                    kelompokPengguna: "Diblokir",
                    keterangan: "",
                    changeTime: ""
                };
                let rKel = [temp, ...r.data, banned];
                setListKelompok(rKel);
                setLoadingKelompok(false);
            }
        });
    }

    const pilihKelompok = (idKelompok) => {
        setIdKelompok(idKelompok);
    }

    const loadUser = () => {
        setLoadingUser(true);
        Ajax.post({
            route: "pengguna/listbykel",
            requestBody: {
                idKelompokPengguna: idKelompok,
                search: search
            },
            success: (r) => {
                setListUser(r.data);
                setLoadingUser(false);
            }
        });
    }

    const editUser = (id) => {
        history.push(`/edituser/${id}`);
    }

    useEffect(() => {
        loadKelompok();
    }, []);

    useEffect(() => {
        loadUser();
    }, [idKelompok]);

    return (
        <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            <header> 
                <h1 className="h3 display">{props.title}</h1>
            </header>
            <div className="row">
                <div className="col-lg-4">
                        <button className="btn btn-primary btn-sm" onClick={() => history.push("/tambahuser")}>
                            <i className="fa fa-plus"></i>{" "}
                            Tambah User
                        </button>
                </div>
                <div className="col-lg-8">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Pencarian" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button"><i className="fa fa-search" onClick={loadUser}></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-lg-4">
                    <div className="list-group list-group-flush" style={{fontSize: "10pt"}}>
                        {
                            listKelompok.map((kel) => {
                                let active = (kel.idKelompokPengguna === idKelompok) ? "active" : "";
                                return (
                                    <button type="button" key={kel.idKelompokPengguna} className={`list-group-item list-group-item-action ${active}`}
                                        onClick={() => pilihKelompok(kel.idKelompokPengguna)}>
                                        <i className="fa fa-chevron-right"></i>{" "}{kel.kelompokPengguna}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-8">
                    <div id="daily-feeds" className="card updates daily-feeds">
                        <div id="feeds-header" className="card-header d-flex justify-content-between align-items-center">
                            <h2 className="h5 display"><a data-toggle="collapse" data-parent="#daily-feeds" href="#feeds-box" aria-expanded="true" aria-controls="feeds-box">Daftar User</a></h2>
                            <div className="right-column">
                                <div className="badge badge-primary">{listUser.length} user ditemukan</div>
                            </div>
                        </div>
                        <div id="feeds-box" role="tabpanel" className="collapse show">
                            <div className="feed-box">
                                <ul className="feed-elements list-unstyled">
                                {/* <!-- List--> */}
                                    {
                                        loadingUser ? (
                                            <>
                                                <SkeletonUser />
                                                <SkeletonUser />
                                                <SkeletonUser />
                                            </>
                                        ) :
                                        (
                                            listUser.map((usr) => {
                                                return <CardUser key={usr.id} email={usr.email} nama={usr.name} onClickEdit={() => editUser(usr.enc_id)} />
                                            })
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default UserList;