import { motion } from 'framer-motion';
import React, { useState } from 'react';
import AddButton from '../Component/AddButton';
import Card from '../Component/Card';
import Ajax from '../Modules/Ajax';
import Swal from 'sweetalert2';

function MenuManagement(props) {
    const [btnAddPosisi, setBtnAddPosisi] = useState("add");
    const [btnIsLoading, setBtnIsLoading] = useState(0);
    const [idParent, setIdParent] = useState(0);
    const [menu, setMenu] = useState("");
    const [route, setRoute] = useState("");
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");

    const resetForm = () => {
        setMenu("");
        setRoute("");
        setTitle("");
        setIcon("");
    }

    const addMenu = () => {
        setBtnIsLoading(1);
        Ajax.post({
            route: "menu/add",
            requestBody: {
                parentId: idParent,
                menu: menu,
                route: route,
                title: title,
                icon: icon
            },
            success: (r) => {
                setBtnIsLoading(0);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data menu telah ditambah',
                });
                resetForm();
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
                    <Card title="Keterangan Menu">
                        <form>
                            <div className="form-group">
                                <label>Menu</label>
                                <input type="text" placeholder="Menu" className="form-control" value={menu} onChange={(e) => setMenu(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Route</label>
                                <input type="text" placeholder="Route" className="form-control" value={route} onChange={(e) => setRoute(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" placeholder="Title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Icon</label>
                                <input type="text" placeholder="Icon" className="form-control" value={icon} onChange={(e) => setIcon(e.target.value)} />
                            </div>
                            <hr/>
                            <div className="form-group">
                                <AddButton addCaption="Tambah Menu" editCaption="Edit Menu" posisi={btnAddPosisi} isLoading={btnIsLoading}
                                    onClickAdd={addMenu} />
                            </div>
                        </form>
                    </Card>
                </div>
                <div className="col-lg-8">
                    <Card title="Daftar Menu">

                    </Card>
                </div>
            </div>
        </motion.div>
    );
}

export default MenuManagement;