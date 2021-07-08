import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import AddButton from '../Component/AddButton';
import Card from '../Component/Card';
import ResetButton from '../Component/ResetButton';
import Ajax from '../Modules/Ajax';

function UserType(props) {
    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [id, setId] = useState(0);
    const [kelompok, setKelompok] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [listKelompok, setListKelompok] = useState([]);
    const [loadingKelompok, setLoadingKelompok] = useState(false);

    const KelompokCard = (props) => {
        return (
            <div className="card" style={{marginBottom: 10}}>
                <div className="card-body">
                    <div style={{fontWeight: "bold", fontSize: "11pt", color: "#68b047"}}>{props.kelompok}</div>
                    <div style={{fontSize: "10pt", marginBottom: "10pt", color: "#5e5e5e"}}>{props.keterangan}</div>
                    <button onClick={props.onClickEdit} className="btn btn-sm btn-outline-warning" style={{marginRight: 5, fontSize: "8pt", fontWeight: "bold"}}>EDIT</button>
                    <button onClick={props.onClickDelete} className="btn btn-sm btn-outline-danger" style={{marginRight: 5, fontSize: "8pt", fontWeight: "bold"}}>HAPUS</button>
                </div>
            </div>
        );
    }

    const KelompokSkeleton = () => {
        return (
            <div className="card" style={{marginBottom: 10}}>
                <div className="card-body">
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

    let addKelompok = () => {
        setBtnIsLoading(1);
        Ajax.post({
            route: "kelompokpengguna/add",
            requestBody: {
                kelompok: kelompok,
                keterangan: keterangan
            },
            success: (r) => {
                setBtnIsLoading(0);
                setKelompok("");
                setKeterangan("");
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data kelompok pengguna telah ditambah!',
                })
                loadKelompok();
                resetForm();
            }
        });
    }

    let editKelompok = () => {
        setBtnIsLoading(1);
        Ajax.post({
            route: "kelompokpengguna/edit",
            requestBody: {
                id: id,
                kelompok: kelompok,
                keterangan: keterangan
            },
            success: (r) => {
                setBtnIsLoading(0);
                setKelompok("");
                setKeterangan("");
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data kelompok pengguna telah diubah!',
                })
                loadKelompok();
                resetForm();
            }
        });
    }

    let findKelompok = (id) => {
        Ajax.get({
            route: `kelompokpengguna/find/${id}`,
            success: (r) => {
                setId(r.data.idKelompokPengguna);
                setKelompok(r.data.kelompokPengguna);
                setKeterangan(r.data.keterangan);
                setBtnAddPosisi("update");
            }
        });
    }

    let deleteKelompok = (id) => {
        Swal.fire({
            title: 'Hapus data',
            text: "Yakin akan menghapus kelompok pengguna ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        })
        .then((result) => {
            if (result.isConfirmed) {
                Ajax.post({
                    route: "kelompokpengguna/delete",
                    requestBody: {id: id},
                    success: (r) => {
                        resetForm();
                        loadKelompok();
                    }
                })
            }
        })
    }

    let resetForm = () => {
        setId(0);
        setKelompok("");
        setKeterangan("");
        setBtnAddPosisi("add");
    }

    useEffect(() => {
        loadKelompok();
    }, [])

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
                {/* <div className="col-lg-5">
                    <Card title="Kelompok User">
                        <form>
                            <div className="form-group">
                                <label>Nama kelompok</label>
                                <input type="text" placeholder="Nama kelompok" className="form-control" value={kelompok} onChange={(e) => setKelompok(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Keterangan</label>
                                <textarea name="" id="" placeholder="Keterangan" className="form-control" value={keterangan} onChange={(e) => setKeterangan(e.target.value)}></textarea>
                            </div>
                            <hr/>
                            <div className="form-group">
                                <AddButton posisi={btnAddPosisi} addCaption="Tambah kelompok pengguna" editCaption="Ubah kelompok pengguna"
                                    isLoading={btnIsLoading}
                                    onClickAdd={() => addKelompok()}
                                    onClickEdit={() => editKelompok()} />
                                {" "}
                                <ResetButton caption="Reset" onClick={() => resetForm()} />
                            </div>
                        </form>
                    </Card>
                </div> */}
                <div className="col-lg-7" style={{height: "400px", overflow: "auto"}}>
                    {
                        loadingKelompok ? (
                            <>
                                <KelompokSkeleton />
                                <KelompokSkeleton />
                                <KelompokSkeleton />
                            </>
                        ) : (
                            listKelompok.map((kel) => {
                                return <KelompokCard key={kel.idKelompokPengguna} kelompok={kel.kelompokPengguna} keterangan={kel.keterangan}
                                    onClickEdit={() => findKelompok(kel.idKelompokPengguna)}
                                    onClickDelete={() => deleteKelompok(kel.idKelompokPengguna)} />
                            })
                        )
                    }
                    
                </div>
            </div>
        </motion.div>
    );
}

export default UserType;