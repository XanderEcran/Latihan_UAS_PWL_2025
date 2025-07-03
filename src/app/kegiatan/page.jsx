"use client";

import {useState, useEffect} from 'react';

export default function KegiatanPage(){
    const [kegiatans, setKegiatans] = useState([]);
    const [organisasis, setOrganisasis] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [judulKegiatan, setJudulKegiatan] = useState('');
    const [idOrganisasi, setIdOrganisasi] = useState('');
    const [tanggalKegiatan, setTanggalKegiatan] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [jenisKegiatan, setJenisKegiatan] = useState('');
    const [deskripsiSingkat, setDeskripsiSingkat] = useState('');
    const [tautanPendaftaran, setTautanPendaftaran] = useState('');
    const [editId, setEditId] = useState(null);
    const [msg, setMsg] = useState('');

    const fetchKegiatans = async () => {
        const res = await fetch('/api/kegiatan');
        const data = await res.json();
        setKegiatans(data);
    };
    const fetchOrganisasis = async () => {
        const res = await fetch('/api/organisasi');
        const data = await res.json();
        setOrganisasis(data);
    };
    useEffect(() => {
        fetchKegiatans();
        fetchOrganisasis();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!judulKegiatan || !idOrganisasi || !tanggalKegiatan || !lokasi || !jenisKegiatan || !deskripsiSingkat || !tautanPendaftaran){
            setMsg('Semua Filed Wajib Diisi');
            return;
        }

        const formattedTanggal = new Date(tanggalKegiatan).toISOString();
        if(isNaN(Date.parse(formattedTanggal))){
            setMsg('Tahun tidak valid');
            return;
        }


        const data = {
            id: editId,
            judulKegiatan,
            idOrganisasi,
            tanggalKegiatan : formattedTanggal,
            lokasi,
            jenisKegiatan,
            deskripsiSingkat,
            tautanPendaftaran,
        };

        const method = editId? 'PUT' : 'POST';
        const res = await fetch('/api/kegiatan', {
            method,
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        });

        if(res.ok){
            setMsg('Berhasil disimpan');
            setJudulKegiatan('');
            setIdOrganisasi('');
            setTanggalKegiatan('');
            setLokasi('');
            setJenisKegiatan('');
            setDeskripsiSingkat('');
            setTautanPendaftaran('');
            setEditId(null);
            setFormVisible(false);
            fetchKegiatans();
        }else{
            setMsg('Gagal menyimpan data')
        }
    };
    const handleEdit = (item) => {
        setJudulKegiatan(item.judulKegiatan);
        setIdOrganisasi(item.idOrganisasi);
        setTanggalKegiatan(item.tanggalKegiatan.split('T')[0]);
        setLokasi(item.lokasi);
        setJenisKegiatan(item.jenisKegiatan);
        setDeskripsiSingkat(item.deskripsiSingkat);
        setTautanPendaftaran(item.tautanPendaftaran);
        setEditId(item.id);
        setFormVisible(true);
    }

    const handleDelete = async (id) => {
        if(!confirm('Yakin ingin hapus data ini')) return;

        await fetch('/api/kegiatan', {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id}),
        })
        fetchKegiatans();
    };

    return (
        <div>
            <button
                onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? "Tutup Form" : "Tambah Data"}
            </button>

            {formVisible && (
                <div>
                    <h3>Input Data Baru</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <span>Nama Kegiatan</span>
                            <input
                            type= "text"
                            value={judulKegiatan}
                            onChange={(e) => setJudulKegiatan(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Nama Organisasi</span>
                            <select
                            value={idOrganisasi}
                            onChange={(e) => setIdOrganisasi(e.target.value)}
                            required
                            >
                                <option value="">Pilih Organisasi</option>
                                {organisasis.map((organisasi) => (
                                    <option key={organisasi.id} value={organisasi.id}>
                                        {organisasi.namaOrganisasi}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <span>Tanggal Kegiatan</span>
                            <input
                            type= "date"
                            value={tanggalKegiatan}
                            onChange={(e) => setTanggalKegiatan(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Lokasi</span>
                            <input
                            type= "text"
                            value={lokasi}
                            onChange={(e) => setLokasi(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Jenis Kegiatan</span>
                            <input
                            type= "text"
                            value={jenisKegiatan}
                            onChange={(e) => setJenisKegiatan(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Deskripsi Singkat</span>
                            <input
                            type= "text"
                            value={deskripsiSingkat}
                            onChange={(e) => setDeskripsiSingkat(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Tautan Pendaftaran</span>
                            <input
                            type= "text"
                            value={tautanPendaftaran}
                            onChange={(e) => setTautanPendaftaran(e.target.value)}
                            required
                            />
                        </div>
                        <button type="submit">
                            Simpan
                        </button>
                        <p>{msg}</p>
                    </form>
                </div>
            )}

            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kegiatan</th>
                        <th>Nama Organisasi</th>
                        <th>Tanggal Kegiatan</th>
                        <th>Lokasi</th>
                        <th>Jenis Kegiatan</th>
                        <th>Deskripsi</th>
                        <th>Tautan Pendaftaran</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kegiatans.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.judulKegiatan}</td>
                            <td>{item.organisasi?.namaOrganisasi || "Unknown"}</td>
                            <td>{new Date(item.tanggalKegiatan).toISOString().split('T')[0]}</td>
                            <td>{item.lokasi}</td>
                            <td>{item.jenisKegiatan}</td>
                            <td>{item.deskripsiSingkat}</td>
                            <td>{item.tautanPendaftaran}</td>
                            <td>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {kegiatans.length === 0 && (
                        <tr>
                            <td colSpan="9">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
