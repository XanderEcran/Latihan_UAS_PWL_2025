"use client";

import {useState, useEffect} from 'react';

export default function OrganisasiPage(){
    const [organisasis, setOrganisasis] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [namaOrganisasi, setNamaOrganisasi] = useState('');
    const [ketuaOrganisasi, setKetuaOrganisasi] = useState('');
    const [noKontak, setNoKontak] = useState('');
    const [tahunDibentuk, setTahunDibentuk] = useState('');
    const [pembina, setPembina] = useState('');
    const [editId, setEditId] = useState(null);
    const [msg, setMsg] = useState('');

    const fetchOrganisasis = async () => {
        const res = await fetch('/api/organisasi');
        const data = await res.json();
        setOrganisasis(data);
    };
    useEffect(() => {
        fetchOrganisasis();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!namaOrganisasi || !ketuaOrganisasi || !noKontak || !tahunDibentuk || !pembina){
            setMsg('Semua Filed Wajib Diisi');
            return;
        }

        const formattedTahun = new Date(tahunDibentuk).toISOString()
        if(isNaN(Date.parse(formattedTahun))){
            setMsg('Tahun tidak valid');
            return;
        }

        const data = {
            id: editId,
            namaOrganisasi,
            ketuaOrganisasi,
            noKontak,
            tahunDibentuk: formattedTahun,
            pembina,
        };

        const method = editId? 'PUT' : 'POST';
        const res = await fetch('/api/organisasi', {
            method,
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        });

        if(res.ok){
            setMsg('Berhasil disimpan');
            setNamaOrganisasi('');
            setKetuaOrganisasi('');
            setNoKontak('');
            setTahunDibentuk('');
            setPembina('');
            setEditId(null);
            setFormVisible(false);
            fetchOrganisasis();
        }else{
            setMsg('Gagal menyimpan data')
        }
    };
    const handleEdit = (item) => {
        setNamaOrganisasi(item.namaOrganisasi);
        setKetuaOrganisasi(item.ketuaOrganisasi);
        setNoKontak(item.noKontak);
        setTahunDibentuk(item.tahunDibentuk.split('T')[0]);
        setPembina(item.pembina);
        setEditId(item.id);
        setFormVisible(true);
    }

    const handleDelete = async (id) => {
        if(!confirm('Yakin ingin hapus data ini')) return;

        await fetch('/api/organisasi', {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id}),
        })
        fetchOrganisasis();
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
                            <span>Nama Organisasi</span>
                            <input
                            type= "text"
                            value={namaOrganisasi}
                            onChange={(e) => setNamaOrganisasi(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Ketua Organisasi</span>
                            <input
                            type= "text"
                            value={ketuaOrganisasi}
                            onChange={(e) => setKetuaOrganisasi(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Nomor Kontak</span>
                            <input
                            type= "text"
                            value={noKontak}
                            onChange={(e) => setNoKontak(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Tahun Dibentuk</span>
                            <input
                            type= "date"
                            value={tahunDibentuk}
                            onChange={(e) => setTahunDibentuk(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <span>Nama Pembina</span>
                            <input
                            type= "text"
                            value={pembina}
                            onChange={(e) => setPembina(e.target.value)}
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
                        <th>Nama Organisasi</th>
                        <th>Ketua Organisasi</th>
                        <th>Nomor Kontak</th>
                        <th>Tahun Terbentuk</th>
                        <th>Pembina</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {organisasis.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.namaOrganisasi}</td>
                            <td>{item.ketuaOrganisasi}</td>
                            <td>{item.noKontak}</td>
                            <td>{new Date(item.tahunDibentuk).toISOString().split('T')[0]}</td>
                            <td>{item.pembina}</td>
                            <td>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {organisasis.length === 0 && (
                        <tr>
                            <td colSpan="7">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
