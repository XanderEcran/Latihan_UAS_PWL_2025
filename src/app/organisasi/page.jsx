"use client";

import {useState, useEffect} from 'react';

export default function OrganisasiPage(){
    const [organisasis, setOrganisasis] = useState([]);

    const fetchOrganisasis = async () => {
        const res = await fetch('/api/organisasi');
        const data = await res.json();
    };
    useEffect(() => {
        fetchOrganisasis();
    }, []);
    
    return (
        <div>
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
                            <td>{item.tahunDibentuk}</td>
                            <td>{item.pembina}</td>
                        </tr>
                    ))}
                    {organisasis.length === 0 && (
                        <tr>
                            <td colspan="6">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
