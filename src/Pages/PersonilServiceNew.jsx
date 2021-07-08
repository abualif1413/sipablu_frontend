import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import AddButton from '../Component/AddButton';
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';

function PersonilServiceNew(props) {
    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [personil_service, set_personil_service] = useState({});
    const [pangkat, set_pangkat] = useState([]);
    const [pendidikan, set_pendidikan] = useState([]);
    const [nama, set_nama] = useState("");
    const [nip, set_nip] = useState("");
    const [id_pangkat, set_id_pangkat] = useState("");
    const [jenkel, set_jenkel] = useState("");
    const [tempat_lahir, set_tempat_lahir] = useState("");
    const [tgl_lahir, set_tgl_lahir] = useState("");
    const [jabatan, set_jabatan] = useState("");
    const [id_pendidikan, set_id_pendidikan] = useState("");
    const [status, set_status] = useState("");
    const [str, set_str] = useState("");
    const [tgl_masuk, set_tgl_masuk] = useState("");


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

    const find_pangkat = () => {
        Ajax.get({
            route: `pangkat/${tipe}`,
            success: (r) => {
                set_pangkat(r.data);
            }
        })
    }

    const find_pendidikan = () => {
        Ajax.get({
            route: `pendidikan`,
            success: (r) => {
                set_pendidikan(r.data);
            }
        })
    }

    const kembali = () => {
        history.push("/personil_service/" + tipe);
    }

    const simpan = () => {
        
        Swal.fire({
            title: 'Perhatian',
            text: "Yakin akan menyimpan data personil ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        })
        .then((result) => {
            if(result.isConfirmed) {
                setBtnIsLoading(1);
                Ajax.post({
                    route: `personil/add`,
                    requestBody: {
                        tipe: tipe,
                        nama: nama,
                        nrp: nip,
                        id_pangkat: id_pangkat,
                        jenkel: jenkel,
                        tempat_lahir: tempat_lahir,
                        tgl_lahir: tgl_lahir,
                        jabatan: jabatan,
                        tgl_masuk: tgl_masuk,
                        status: status,
                        id_pendidikan: id_pendidikan,
                        str: str
                    },
                    success: (r) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: "Data personil telah ditambah",
                        });
                        setBtnIsLoading(0);
                        history.push("/personil_service/" + tipe);
                    }
                })
            }
        })
            
    }

    useEffect(() => {
        find_service();
        find_pangkat();
        find_pendidikan();
    }, [tipe]);

    return (
        <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            <header> 
                <h1 className="h3 display">Tambah Data Personil : {personil_service.judul ?? ""}</h1>
            </header>

            <div className="row">
                <div className="col-lg-12">
                    <Card title={`Informasi Personil : ${personil_service.judul ?? ""}`}>
                        <button type="button" className="btn btn-sm btn-warning" onClick={kembali}><i className="fa fa-chevron-left"></i>{" "}Kembali</button>
                        <br />
                        <br />
                        <form>
                            <div className="row">
                                <div className="form-group col-lg-4">
                                    <label>Nama</label>
                                    <input type="text" placeholder="Nama" className="form-control" value={nama} onChange={(e) => {set_nama(e.target.value)}} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label>NIP / NIK (ASN) / NRP (Polri)</label>
                                    <input type="text" placeholder="NIP / NIK (ASN) / NRP (Polri)" className="form-control" value={nip} onChange={(e) => {set_nip(e.target.value)}} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label>Pangkat</label>
                                    <select className="form-control" value={id_pangkat} onChange={(e) => set_id_pangkat(e.target.value)}>
                                        <option value="">- Pilih pangkat -</option>
                                        {
                                            pangkat.map((p) => {
                                                return <option value={p.id}>{p.pangkat}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-lg-4">
                                    <label>Jenis Kelamin</label>
                                    <select className="form-control" value={jenkel} onChange={(e) => set_jenkel(e.target.value)}>
                                        <option value="">- Pilih jenis kelamin -</option>
                                        <option value="l">Laki-laki</option>
                                        <option value="p">Perempuan</option>
                                    </select>
                                </div>
                                <div className="form-group col-lg-4">
                                    <label>Tempat Lahir</label>
                                    <input type="text" placeholder="Tempat Lahir" className="form-control" value={tempat_lahir} onChange={(e) => {set_tempat_lahir(e.target.value)}} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label>Tgl. Lahir</label>
                                    <input type="date" placeholder="Tgl. Lahir" className="form-control" value={tgl_lahir} onChange={(e) => {set_tgl_lahir(e.target.value)}} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-lg-6">
                                    <label>Jabatan</label>
                                    <input type="text" placeholder="Jabatan" className="form-control" value={jabatan} onChange={(e) => {set_jabatan(e.target.value)}} />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label>Pendidikan Terakhir</label>
                                    <select className="form-control" value={id_pendidikan} onChange={(e) => set_id_pendidikan(e.target.value)}>
                                        <option value="">- Pilih pendidikan terakhir -</option>
                                        {
                                            pendidikan.map((p) => {
                                                return <option value={p.id}>{p.pendidikan}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-lg-4">
                                    <label>Status</label>
                                    <input type="text" placeholder="Jabatan" className="form-control" value={status} onChange={(e) => {set_status(e.target.value)}} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label>STR</label>
                                    <input type="text" placeholder="STR" className="form-control" value={str} onChange={(e) => {set_str(e.target.value)}} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label>Tgl. Aktif di Unit</label>
                                    <input type="date" placeholder="Tgl. Aktif di Unit" className="form-control" value={tgl_masuk} onChange={(e) => {set_tgl_masuk(e.target.value)}} />
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Card>
                        {/* <button className="btn btn-primary btn-block"><i className="fa fa-save"></i>{' '}Simpan Data</button> */}

                        <AddButton addCaption={`Simpan data personil: ${personil_service.judul ?? ""}`} editCaption="Simpan data pasien" posisi={btnAddPosisi} isLoading={btnIsLoading} onClickAdd={simpan} block />
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default PersonilServiceNew;