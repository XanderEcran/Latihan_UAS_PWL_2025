-- CreateTable
CREATE TABLE "organisasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaOrganisasi" TEXT NOT NULL,
    "ketuaOrganisasi" TEXT NOT NULL,
    "noKontak" TEXT NOT NULL,
    "tahunDibentuk" DATETIME NOT NULL,
    "pembina" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul_kegiatan" TEXT NOT NULL,
    "idOrganisasi" INTEGER NOT NULL,
    "tanggalKegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenisKegiatan" TEXT NOT NULL,
    "deskripsiSingkat" TEXT NOT NULL,
    "tautanPendaftaran" TEXT,
    CONSTRAINT "kegiatan_idOrganisasi_fkey" FOREIGN KEY ("idOrganisasi") REFERENCES "organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
