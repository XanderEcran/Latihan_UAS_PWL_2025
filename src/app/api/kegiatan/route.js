import prisma from '@/lib/prisma';

export async function GET(){
    const data = await prisma.kegiatan.findMany({
        include:{organisasi: true},
        orderBy: {id : 'asc'},
    });

    return new Response(JSON.stringify(data), {status:200})
}
export async function POST(request) {
    const {judulKegiatan, idOrganisasi, tanggalKegiatan, lokasi, jenisKegiatan, deskripsiSingkat, tautanPendaftaran} = await request.json();

    if (!judulKegiatan || !idOrganisasi || !tanggalKegiatan || !lokasi || !jenisKegiatan || !deskripsiSingkat || !tautanPendaftaran){
        return new Response(JSON.stringify({error: 'Semua field wajib diisi'}), {
            status: 400,
        });
    }
    
    const kegiatan = await prisma.kegiatan.create({
        data : {judulKegiatan, idOrganisasi: Number(idOrganisasi), tanggalKegiatan, lokasi, jenisKegiatan, deskripsiSingkat, tautanPendaftaran},
    });
    return new Response(JSON.stringify(kegiatan), {status: 201});
    
}

export async function PUT(request) {
    const {id, judulKegiatan, idOrganisasi, tanggalKegiatan, lokasi, jenisKegiatan, deskripsiSingkat, tautanPendaftaran} = await request.json();
    if(!id || !judulKegiatan || !idOrganisasi || !tanggalKegiatan || !lokasi || !jenisKegiatan || !deskripsiSingkat || !tautanPendaftaran) return Response.json({error : 'Field Kosong'}, {
        status: 400});

    const kegiatan = await prisma.kegiatan.update({
        where: {id},
        data: {judulKegiatan, idOrganisasi: Number(idOrganisasi), tanggalKegiatan, lokasi, jenisKegiatan, deskripsiSingkat, tautanPendaftaran},
    });
    return Response.json(kegiatan);
}

export async function DELETE(request) {
    const {id} = await request.json();
    if(!id) return Response.json({error: 'ID tidak ditemukan'}, {status : 400});

    await prisma.kegiatan.delete({where : {id}});
    return Response.json({message: 'Berhasil dihapus'});
}