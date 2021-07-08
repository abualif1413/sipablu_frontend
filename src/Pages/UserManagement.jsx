import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddButton from '../Component/AddButton';
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';
import Skeleton from 'react-loading-skeleton';
import { useHistory, useParams } from 'react-router';

function UserManagement(props) {
    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [listKelompok, setListKelompok] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [idKelompokPengguna, setIdKelompokPengguna] = useState("");
    const [loadingKelompok, setLoadingKelompok] = useState(false);

    const history = useHistory();

    let {id} = useParams();

    const KelompokCard = (props) => {
        return (
            <div className="card" style={{marginBottom: 5}}>
                <div className="card-body" style={{ paddingTop: 10, paddingBottom: 2}}>
                    <div style={{fontWeight: "bold", fontSize: "11pt", color: "#68b047"}}>{props.kelompok}</div>
                    <div style={{fontSize: "10pt", marginBottom: "10pt", color: "#5e5e5e"}}>{props.keterangan}</div>
                </div>
            </div>
        );
    }

    const KelompokSkeleton = () => {
        return (
            <div className="card" style={{marginBottom: 5}}>
                <div className="card-body" style={{ paddingTop: 10, paddingBottom: 10}}>
                    <Skeleton width={200} height={20} />
                    <Skeleton width={500} height={40} />
                </div>
            </div>
        );
    }

    const loadKelompok = () => {
        setLoadingKelompok(true);
        Ajax.post({
            route: "kelompokpengguna/all",
            success: (r) => {
                setListKelompok(r.data);
                setLoadingKelompok(false);
            }
        });
    }

    const findUser = () => {
        Ajax.post({
            route: "pengguna/find",
            requestBody: {id: id},
            success: (r) => {
                setName(r.data.name);
                setEmail(r.data.email);
                setIdKelompokPengguna(r.data.idKelompokPengguna);
            }
        })
    }

    const addUser = () => {
        Swal.fire({
            title: 'Perhatian',
            text: "Yakin akan menyimpan data pengguna ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        })
        .then((result) => {
            if (result.isConfirmed) {
                setBtnIsLoading(1);
                Ajax.post({
                    route: "pengguna/add",
                    requestBody: {
                        name: name,
                        email: email,
                        password: pass1,
                        password2: pass2,
                        idKelompokPengguna: idKelompokPengguna
                    },
                    success: (r) => {
                        setBtnIsLoading(0);
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Data pengguna telah ditambah!',
                        });
                        history.push("/kelolauser");
                    },
                    error: (r) => {
                        setBtnIsLoading(0);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: r.data.message,
                        });
                    }
                });
            }
        })
    }

    const editUser = () => {

    }

    useEffect(() => {
        loadKelompok();
        if(id) {
            findUser();
            setBtnAddPosisi("edit");
        }
    }, []);

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
                <div className="col-lg-5">
                    <Card title="Informasi User">
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Alamat email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Nama</label>
                                <input type="text" placeholder="Nama lengkap" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="Password" className="form-control" value={pass1} onChange={(e) => setPass1(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Ulangi Password</label>
                                <input type="password" placeholder="Ulangi Password" className="form-control" value={pass2} onChange={(e) => setPass2(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Tipe User</label>
                                <select name="" id="" className="form-control" value={idKelompokPengguna} onChange={(e) => setIdKelompokPengguna(e.target.value)}>
                                    <option value=""></option>
                                    {
                                        listKelompok.map((kel) => {
                                            return <option key={kel.idKelompokPengguna} value={kel.idKelompokPengguna}>{kel.kelompokPengguna}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <hr/>
                            <div className="form-group">
                                <AddButton posisi={btnAddPosisi} addCaption="Tambah pengguna" editCaption="Ubah pengguna"
                                    isLoading={btnIsLoading}
                                    onClickAdd={() => addUser()}
                                    onClickEdit={() => editUser()} />
                            </div>
                        </form>
                    </Card>
                </div>
                <div className="col-lg-7">
                    <Card title="Daftar tipe user">
                        {
                            loadingKelompok ? (
                                <>
                                    <KelompokSkeleton />
                                    <KelompokSkeleton />
                                    <KelompokSkeleton />
                                </>
                            ) : (
                                listKelompok.map((kel) => {
                                    return <KelompokCard key={kel.idKelompokPengguna} kelompok={kel.kelompokPengguna} keterangan={kel.keterangan} />
                                })
                            )
                        }
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default UserManagement;