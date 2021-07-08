import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AddButton from '../Component/AddButton';
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';

function InformasiUmumRS(props) {
    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [kode_pusat, set_kode_pusat] = useState("");
    const [kode, set_kode] = useState("");
    const [nama, set_nama] = useState("");
    const [tipe_fasyankes, set_tipe_fasyankes] = useState("");
    const [kelas, set_kelas] = useState("");
    const [provinsi, set_provinsi] = useState("");
    const [kabupaten, set_kabupaten] = useState("");
    const [kecamatan, set_kecamatan] = useState("");
    const [kelurahan, set_kelurahan] = useState("");
    const [alamat, set_alamat] = useState("");
    const [kode_pos, set_kode_pos] = useState("");
    const [telepon, set_telepon] = useState("");
    const [fax, set_fax] = useState("");
    const [email, set_email] = useState("");
    const [website, set_website] = useState("");

    const ubah = () => {
        setBtnIsLoading(1);
        Ajax.post({
            route: "profil_rumah_sakit/informasi_umum",
            requestBody: {
                kode_pusat: kode_pusat,
                kode: kode,
                nama: nama,
                tipe_fasyankes: tipe_fasyankes,
                kelas: kelas,
                provinsi: provinsi,
                kabupaten: kabupaten,
                kecamatan: kecamatan,
                kelurahan: kelurahan,
                alamat: alamat,
                kode_pos: kode_pos,
                telepon: telepon,
                fax: fax,
                email: email,
                website: website
            },
            success: (r) => {
                setBtnIsLoading(0);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Biodata rumah sakit telah diubah',
                });
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
        <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            <header> 
                <h1 className="h3 display">{props.title}</h1>
            </header>
            <div className="row">
                <div className="col lg-12">
                    <Card title="Biodata Rumah Sakit">
                        <form>
                            <div className="form-group">
                                <label>Kode Pusat</label>
                                <input type="text" name="kode_pusat" id="kode_pusat" className="form-control" placeholder="Kode pusat" value={ kode_pusat } onChange={(e) => set_kode_pusat(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Kode</label>
                                <input type="text" name="kode" id="kode" className="form-control" placeholder="Kode" value={kode} onChange={(e) => set_kode(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Nama rumah sakit</label>
                                <input type="text" name="nama" id="nama" className="form-control" placeholder="Nama rumah sakit" value={nama} onChange={(e) => set_nama(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Tipe fasyankes</label>
                                <input type="text" className="form-control" placeholder="Tipe fasyankes" value={tipe_fasyankes} onChange={(e) => set_tipe_fasyankes(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Kelas</label>
                                <input type="text" className="form-control" placeholder="Kelas" value={kelas} onChange={(e) => set_kelas(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Provinsi</label>
                                <input type="text" className="form-control" placeholder="Provinsi" value={provinsi} onChange={(e) => set_provinsi(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Kabupaten / Kota</label>
                                <input type="text" className="form-control" placeholder="Kabupaten" value={kabupaten} onChange={(e) => set_kabupaten(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Kecamatan</label>
                                <input type="text" className="form-control" placeholder="Kecamatan" value={kecamatan} onChange={(e) => set_kecamatan(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Kelurahan</label>
                                <input type="text" className="form-control" placeholder="Kelurahan" value={kelurahan} onChange={(e) => set_kelurahan(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Alamat lengkap</label>
                                <input type="text" className="form-control" placeholder="Alamat lengkap" value={alamat} onChange={(e) => set_alamat(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Kode Pos</label>
                                <input type="text" className="form-control" placeholder="Kode Pos" value={kode_pos} onChange={(e) => set_kode_pos(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Telepon</label>
                                <input type="text" className="form-control" placeholder="Telepon" value={telepon} onChange={(e) => set_telepon(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Fax</label>
                                <input type="text" className="form-control" placeholder="Fax" value={fax} onChange={(e) => set_fax(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => set_email(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Website</label>
                                <input type="text" className="form-control" placeholder="Website" value={website} onChange={(e) => set_website(e.target.value)} />
                            </div>
                            <hr/>
                            <div className="form-group">
                                <AddButton addCaption="Simpan biodata rumah sakit" editCaption="Simpan biodata rumah sakit" posisi={btnAddPosisi} isLoading={btnIsLoading} onClickAdd={ubah} />
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default InformasiUmumRS;