import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import AddButton from '../Component/AddButton';
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';

function PelayananServiceNew(props) {
    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [pelayanan_service, set_pelayanan_service] = useState({});
    const [tipe_pembayaran, set_tipe_pembayaran] = useState([]);
    const [ruangan, set_ruangan] = useState([]);
    const [poliklinik, set_poliklinik] = useState([]);
    const [nama, set_nama] = useState("");
    const [jenkel, set_jenkel] = useState("");
    const [tempat_lahir, set_tempat_lahir] = useState("");
    const [tgl_lahir, set_tgl_lahir] = useState("");
    const [tgl_berobat, set_tgl_berobat] = useState("");
    const [catatan, set_catatan] = useState("");
    const [id_ruangan, set_id_ruangan] = useState("");
    const [id_poliklinik, set_id_poliklinik] = useState("");
    const [id_tipe_pembayaran, set_id_tipe_pembayaran] = useState(0);

    let history = useHistory();
    let { tipe } = useParams();

    const find_service = () => {
        Ajax.get({
            route: `pelayanan_service_find/${tipe}`,
            success: (r) => {
                set_pelayanan_service(r.data);
            }
        })
    }

    const get_tipe_pembayaran = () => {
        Ajax.get({
            route: `all_tipe_pembayaran`,
            success: (r) => {
                set_tipe_pembayaran(r.data);
            }
        });
    }

    const get_ruangan = () => {
        Ajax.get({
            route: `all_ruangan`,
            success: (r) => {
                set_ruangan(r.data);
            }
        });
    }

    const get_poliklinik = () => {
        Ajax.get({
            route: `all_poliklinik`,
            success: (r) => {
                set_poliklinik(r.data);
            }
        });
    }

    const kembali = () => {
        history.push("/pelayanan_service/" + tipe);
    }

    const simpan = () => {
        if(nama.trim() === "" || jenkel.trim() === "" || tgl_lahir === "" || tgl_berobat === "" || catatan === "" || id_tipe_pembayaran === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Perhatian',
                text: "Data yang diinput belum lengkap. Harap lengkapi terlebih dahulu",
            });
        } else {
            if(tipe === "ri" && id_ruangan === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Perhatian',
                    text: "Khusus untuk pasien rawat inap, harap tentukan pasien menginap di ruangan apa",
                });
            } else if(tipe === "poli" && id_poliklinik === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Perhatian',
                    text: "Khusus untuk pasien poliklinik spesialis, harap tentukan poliklinik tempat pasien di layani",
                });
            } else {
                Swal.fire({
                    title: 'Perhatian',
                    text: "Yakin akan menyimpan data pasien ini?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33'
                })
                .then((result) => {
                    if(result.isConfirmed) {
                        setBtnIsLoading(1);
                        Ajax.post({
                            route: "add_pasien",
                            requestBody: {
                                nama: nama, 
                                jenkel: jenkel, 
                                tempat_lahir: tempat_lahir, 
                                tgl_lahir: tgl_lahir, 
                                tgl_berobat: tgl_berobat, 
                                catatan: catatan, 
                                tipe: tipe, 
                                id_ruangan: id_ruangan, 
                                id_tipe_pembayaran: id_tipe_pembayaran, 
                                id_poliklinik: id_poliklinik
                            },
                            success: (r) => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Berhasil',
                                    text: "Data pasien pelayanan telah ditambah",
                                });
                                setBtnIsLoading(0);
                                history.push("/pelayanan_service/" + tipe);
                            }
                        })
                    }
                })
            }
        }
    }

    useEffect(() => {
        find_service();
        get_tipe_pembayaran();
        get_ruangan();
        get_poliklinik();
    }, [tipe]);

    return (
        <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            <header> 
                <h1 className="h3 display">Tambah Data Pasien {pelayanan_service.judul ?? ""}</h1>
            </header>

            <div className="row">
                <div className="col-lg-6">
                    <Card title={`Informasi Pasien : ${pelayanan_service.judul ?? ""}`}>
                        <button type="button" className="btn btn-sm btn-warning" onClick={kembali}><i className="fa fa-chevron-left"></i>{" "}Kembali</button>
                        <br />
                        <br />
                        <form>
                            <div className="form-group">
                                <label>Nama</label>
                                <input type="text" placeholder="Nama" className="form-control" value={nama} onChange={(e) => {set_nama(e.target.value)}} />
                            </div>
                            <div className="form-group">
                                <label>Tempat Lahir</label>
                                <input type="text" placeholder="Tempat Lahir" className="form-control" value={tempat_lahir} onChange={(e) => {set_tempat_lahir(e.target.value)}} />
                            </div>
                            <div className="form-group">
                                <label>Tgl. Lahir</label>
                                <input type="date" placeholder="Tgl. Lahir" className="form-control" value={tgl_lahir} onChange={(e) => {set_tgl_lahir(e.target.value)}} />
                            </div>
                            <div className="form-group">
                                <label>Jenis Kelamin</label>
                                <select className="form-control" value={jenkel} onChange={(e) => {set_jenkel(e.target.value)}}>
                                    <option value="">- Pilih Jenis Kelamin -</option>
                                    <option value="l">Laki-Laki</option>
                                    <option value="p">Perempuan</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Catatan / Keluhan / Diagnosa</label>
                                <textarea className="form-control" value={catatan} onChange={(e) => {set_catatan(e.target.value)}}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Tgl. Kunjungan / Pelayanan</label>
                                <input type="date" placeholder="Tgl. Kunjungan / Pelayanan" className="form-control" value={tgl_berobat} onChange={(e) => {set_tgl_berobat(e.target.value)}} />
                            </div>
                            {
                                (tipe === "ri") ?
                                    <div className="form-group">
                                        <label>Ruangan</label>
                                        <select className="form-control" value={id_ruangan} onChange={(e) => {set_id_ruangan(e.target.value)}}>
                                            <option value="">- Pilih Ruangan -</option>
                                            {
                                                ruangan.map((r) => {
                                                    return <option value={r.id_ruangan}>{r.ruangan}</option>
                                                })
                                            }
                                        </select>
                                    </div> : ""
                            }
                            {
                                (tipe === "poli") ?
                                    <div className="form-group">
                                        <label>Poliklinik</label>
                                        <select className="form-control" value={id_poliklinik} onChange={(e) => {set_id_poliklinik(e.target.value)}}>
                                            <option value="">- Pilih Poliklinik -</option>
                                            {
                                                poliklinik.map((p) => {
                                                    return <option value={p.id_poliklinik}>{p.poliklinik}</option>
                                                })
                                            }
                                        </select>
                                    </div> : ""
                            }
                        </form>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card title={`Tipe Pembayaran`}>
                        {
                            tipe_pembayaran.map((tp) => {
                                let btn_class = (id_tipe_pembayaran === tp.id_tipe_pembayaran) ? "btn-danger" : "btn-default";
                                return (
                                    <button key={tp.id_tipe_pembayaran} style={{textAlign: "left"}} className={`btn btn-block ${btn_class}`} onClick={() => { set_id_tipe_pembayaran(tp.id_tipe_pembayaran) }}>
                                        <img src={`${Ajax.be_url()}/public/icons/${tp.icons}`} alt={tp.icons} style={{height: "30px"}} />{' '}
                                        {tp.tipe_pembayaran}
                                    </button>
                                )
                            })
                        }
                        <div style={{color: "green", marginTop: "10px", fontSize: "10pt"}}>*) Klik salah satu untuk memilih tipe pembayaran</div>
                    </Card>

                    <Card>
                        {/* <button className="btn btn-primary btn-block"><i className="fa fa-save"></i>{' '}Simpan Data</button> */}

                        <AddButton addCaption="Simpan data pasien" editCaption="Simpan data pasien" posisi={btnAddPosisi} isLoading={btnIsLoading} onClickAdd={simpan} block />
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default PelayananServiceNew;