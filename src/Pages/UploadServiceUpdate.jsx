import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Card from '../Component/Card';
import Swal from 'sweetalert2';
import UploadButton from '../Component/UploadButton';
import { useHistory, useParams } from 'react-router';
import Ajax from '../Modules/Ajax';

UploadServiceUpdate.propTypes = {
    
};

function UploadServiceUpdate(props) {
    let { tipe, id } = useParams();
    let history  = useHistory();
    const [upload_service, set_upload_service] = useState({});

    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [progress, set_progress] = useState("");
    const [judul, set_judul] = useState("");
    const [tanggal, set_tanggal] = useState("");
    const [author, set_author] = useState("");
    const [keterangan, set_keterangan] = useState("");
    const [nama_file, set_nama_file] = useState("");
    const [berkas, set_berkas] = useState(null);

    const kembali = () => {
        history.push("/upload_service/" + tipe);
    }

    const validasi = () => {
        if(judul.trim() === "" || tanggal.trim() === "" || author.trim() === "" || keterangan.trim() === "") {
            Swal.fire({
                title: 'Perhatian',
                text: "Input data belum lengkap. Harap lengkapi data dahulu",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            });

            return false;
        }

        return true;
    }

    const simpan_dan_upload = () => {
        if(validasi()) {
            Swal.fire({
                title: 'Perhatian',
                text: "Yakin akan menyimpan dan mengupload data ini?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    setBtnIsLoading(1);
                    
                    const formData = new FormData();
                    if(berkas !== null)
                        formData.append("berkas", berkas, berkas.name);
                    formData.append("id_data_upload", id);
                    formData.append("judul", judul);
                    formData.append("tanggal", tanggal);
                    formData.append("author", author);
                    formData.append("keterangan", keterangan);
                    formData.append("tipe", tipe);
                    Ajax.upload({
                        route: "update_upload_file",
                        formData: formData,
                        progress: (evt) => {
                            let progress = Math.round(evt.loaded * 100 / evt.total);
                            set_progress(progress);
                        },
                        success: (r) => {
                            setBtnIsLoading(0);
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil',
                                text: 'Data telah disimpan dan berkas telah diupload',
                            });
                            kembali();
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
    }

    useEffect(() => {
        Ajax.get({
            route: "upload_service/" + tipe,
            success: (r) => {
                set_upload_service(r.data);
            }
        });

        Ajax.get({
            route: "find_data_upload/" + id,
            success: (r) => {
                set_judul(r.data.judul);
                set_tanggal(r.data.tanggal);
                set_author(r.data.author);
                set_keterangan(r.data.keterangan);
                set_nama_file(r.data.nama_file);
            }
        })
    }, []);

    return (
        <motion.div
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            <header> 
                <h1 className="h3 display">{`Ubah Data ${upload_service.judul ?? ""}`}</h1>
            </header>

            <div className="row">
                <div className="col-lg-6">
                    <Card title={`Informasi Data : ${upload_service.judul ?? ""}`}>
                        <button type="button" className="btn btn-sm btn-warning" onClick={kembali}><i className="fa fa-chevron-left"></i>{" "}Kembali</button>
                        <br />
                        <br />
                        <form>
                            <div className="form-group">
                                <label>Judul Dokumen</label>
                                <input type="text" className="form-control" value={judul} onChange={(e) => set_judul(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Tgl. Dokumen</label>
                                <input type="date" className="form-control" value={tanggal} onChange={(e) => set_tanggal(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Author / Pembuat</label>
                                <input type="text" className="form-control" value={author} onChange={(e) => set_author(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Keterangan / Uraian</label>
                                <textarea className="form-control" value={keterangan} onChange={(e) => set_keterangan(e.target.value)}></textarea>
                            </div>
                        </form>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card title={`Pilih Berkas Untuk di Upload`}>
                        <input type="file" className="form-control" onChange={(e) => set_berkas(e.target.files[0])} />
                        <small className="form-text">
                            Jika file yang telah di-upload tidak ingin diganti, maka kosongkan.
                            Tetapi jika ingin diganti, maka silahkan pilih file yang terbaru untuk diupload.
                            <br />
                            <a href={Ajax.be_url() + "/public/uploads/" + nama_file} target="_blank">Klik untuk melihat file sebelumnya</a>
                        </small>
                    </Card>

                    <Card>
                        <UploadButton addCaption="Simpan dan Upload Data" editCaption="" posisi={btnAddPosisi} isLoading={btnIsLoading} onClickAdd={simpan_dan_upload} />
                        <div style={{fontWeight: "bold", fontSize: "15pt"}}>Progress : {(progress !== "") ? `${progress}%` : ``}</div>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default UploadServiceUpdate;