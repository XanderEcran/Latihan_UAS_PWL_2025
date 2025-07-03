import prisma from '@/lib/prisma';

export async function GET(){
    const data = await prisma.organisasi.findMany({
        orderBy: {id : 'asc'},
    });

    return new Response(JSON.stringify(data), {status:200})
}
export async function POST(request) {
    const {namaOrganisasi, ketuaOrganisasi, noKontak, tahunDibentuk, pembina} = await request.json();

    if (!namaOrganisasi || !ketuaOrganisasi || !noKontak || !tahunDibentuk || !pembina){
        return new Response(JSON.stringify({error: 'Semua field wajib diisi'}), {
            status: 400,
        });
    }
    
    const organisasi = await prisma.organisasi.create({
        data : {namaOrganisasi, ketuaOrganisasi, noKontak, tahunDibentuk, pembina},
    });
    return new Response(JSON.stringify(organisasi), {status: 201});
    
}

export async function PUT(request) {
    const {id, namaOrganisasi, ketuaOrganisasi, noKontak, tahunDibentuk, pembina} = await request.json();
    if(!id || !namaOrganisasi || !ketuaOrganisasi || !noKontak || !tahunDibentuk || !pembina) return Response.json({error : 'Field Kosong'}, {
        status: 400});

    const organisasi = await prisma.organisasi.update({
        where: {id},
        data: {namaOrganisasi, ketuaOrganisasi, noKontak, tahunDibentuk, pembina},
    });
    return Response.json(organisasi);
}

export async function DELETE(request) {
    const {id} = await request.json();
    if(!id) return Response.json({error: 'ID tidak ditemukan'}, {status : 400});

    await prisma.organisasi.delete({where : {id}});
    return Response.json({message: 'Berhasil dihapus'});
}