import { Chart, registerables } from 'chart.js';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';

function Dashboard(props) {
    Chart.register(...registerables);

    const periode = moment().clone().startOf('month').format('YYYY-MM');
    const [periode_kunjungan_per_kegiatan, set_periode_kunjungan_per_kegiatan] = useState(periode);
    const [periode_kunjungan_rawat_inap, set_periode_kunjungan_rawat_inap] = useState(periode);
    const [periode_tipe_pembayaran, set_periode_tipe_pembayaran] = useState(periode);
    const [tipe, set_tipe] = useState("-");
    const [pelayanan_service, set_pelayanan_service] = useState([]);

    const load_chart_kunjungan_per_kegiatan = () => {
        Ajax.get({
            route: "chart/kunjungan_per_kegiatan/" + periode_kunjungan_per_kegiatan,
            success: (r) => {
                let response = r.data;
                let ctx = document.getElementById('kunjungan_per_kegiatan').getContext('2d');
                let label = [];
                let data = [];
                for (let i = 0; i < response.length; i++) {
                    label.push(response[i].judul);
                    data.push(response[i].jumlah);
                }
                if(window.chart_kunjungan_per_kegiatan != null){
                    window.chart_kunjungan_per_kegiatan.destroy();
                }
                window.chart_kunjungan_per_kegiatan = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: label,
                        datasets: [{
                            label: 'Kunjungan ',
                            data: data,
                            backgroundColor: [
                                '#121b4da3'
                            ],
                            borderColor: [
                                '#121b4d'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        indexAxis: 'x',
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true
                            }
                        }
                    }
                });
            }
        });
    }

    const load_chart_kunjungan_rawat_inap = () => {
        Ajax.get({
            route: "chart/kunjungan_rawat_inap/" + periode_kunjungan_rawat_inap,
            success: (r) => {
                let response = r.data;
                let ctx = document.getElementById('kunjungan_rawat_inap').getContext('2d');
                let label = [];
                let data = [];
                for (let i = 0; i < response.length; i++) {
                    label.push(response[i].ruangan);
                    data.push(response[i].jumlah);
                }
                if(window.chart_kunjungan_rawat_inap != null){
                    window.chart_kunjungan_rawat_inap.destroy();
                }
                window.chart_kunjungan_rawat_inap = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: label,
                        datasets: [{
                            label: 'Kunjungan ',
                            data: data,
                            backgroundColor: [
                                '#121b4da3'
                            ],
                            borderColor: [
                                '#121b4d'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        indexAxis: 'x',
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true
                            }
                        }
                    }
                });
            }
        });
    }

    const load_chart_tipe_pembayaran = () => {
        Ajax.get({
            route: "chart/tipe_pembayaran/" + periode_kunjungan_rawat_inap + "/" + tipe,
            success: (r) => {
                let response = r.data;
                let ctx = document.getElementById('tipe_pembayaran').getContext('2d');
                let label = [];
                let data = [];
                for (let i = 0; i < response.length; i++) {
                    label.push(response[i].tipe_pembayaran);
                    data.push(response[i].jumlah);
                }
                if(window.chart_tipe_pembayaran != null){
                    window.chart_tipe_pembayaran.destroy();
                }
                window.chart_tipe_pembayaran = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: label,
                        datasets: [{
                            label: 'Pembayaran ',
                            data: data,
                            backgroundColor: [
                                '#121b4da3'
                            ],
                            borderColor: [
                                '#121b4d'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        indexAxis: 'x',
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true
                            }
                        }
                    }
                });
            }
        });
    }

    useEffect(() => {
        Ajax.get({
            route: "pelayanan_service",
            success: (r) => {
                set_pelayanan_service(r.data);
            }
        })
        load_chart_kunjungan_per_kegiatan();
        load_chart_kunjungan_rawat_inap();
        load_chart_tipe_pembayaran();
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

            <Card title={`Diagram kunjungan pasien per kegiatan periode ${periode_kunjungan_per_kegiatan}`}>
                <form className="mb-3">
                    <div className="input-group col-lg-4">
                        <input type="text" className="form-control" placeholder={`Periode : ${periode_kunjungan_per_kegiatan}`} value={periode_kunjungan_per_kegiatan} onChange={(e) => set_periode_kunjungan_per_kegiatan(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-success" type="button" onClick={load_chart_kunjungan_per_kegiatan}>Refresh Diagram</button>
                        </div>
                    </div>
                </form>
                <canvas id="kunjungan_per_kegiatan" width="400" height="100"></canvas>
            </Card>
            <Card title={`Diagram kunjungan pasien rawat inap periode ${periode_kunjungan_rawat_inap}`}>
                <form className="mb-3">
                    <div className="input-group col-lg-4">
                        <input type="text" className="form-control" placeholder={`Periode : ${periode_kunjungan_rawat_inap}`} value={periode_kunjungan_rawat_inap} onChange={(e) => set_periode_kunjungan_rawat_inap(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-success" type="button" onClick={load_chart_kunjungan_rawat_inap}>Refresh Diagram</button>
                        </div>
                    </div>
                </form>
                <canvas id="kunjungan_rawat_inap" width="400" height="100"></canvas>
            </Card>
            <Card title={`Diagram metode pembayaran pasien per kegiatan periode ${periode_tipe_pembayaran}`}>
                <form className="mb-3">
                    <div className="row">
                        <div className="form-group col-lg-4">
                            <input type="text" className="form-control" placeholder={`Periode : ${periode_tipe_pembayaran}`} value={periode_tipe_pembayaran} onChange={(e) => set_periode_tipe_pembayaran(e.target.value)} />
                        </div>
                        <div className="form-group col-lg-6">
                            <select className="form-control" value={tipe} onChange={(e) => set_tipe(e.target.value)}>
                                <option value="-">- Semua kegiatan -</option>
                                {
                                    pelayanan_service.map((p) => {
                                        return <option value={p.tipe}>{p.judul}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-lg-2">
                            <button type="button" className="btn btn-outline-success" onClick={load_chart_tipe_pembayaran}>Refresh Diagram</button>
                        </div>
                    </div>
                </form>
                <canvas id="tipe_pembayaran" width="400" height="100"></canvas>
            </Card>
        </motion.div>
    );
}

export default Dashboard;