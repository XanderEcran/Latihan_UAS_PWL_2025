/*
  Warnings:

  - You are about to drop the column `tautanPendaftaran` on the `kegiatan` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judulKegiatan" TEXT NOT NULL,
    "idOrganisasi" INTEGER NOT NULL,
    "tanggalKegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenisKegiatan" TEXT NOT NULL,
    "deskripsiSingkat" TEXT NOT NULL,
    CONSTRAINT "kegiatan_idOrganisasi_fkey" FOREIGN KEY ("idOrganisasi") REFERENCES "organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_kegiatan" ("deskripsiSingkat", "id", "idOrganisasi", "jenisKegiatan", "judulKegiatan", "lokasi", "tanggalKegiatan") SELECT "deskripsiSingkat", "id", "idOrganisasi", "jenisKegiatan", "judulKegiatan", "lokasi", "tanggalKegiatan" FROM "kegiatan";
DROP TABLE "kegiatan";
ALTER TABLE "new_kegiatan" RENAME TO "kegiatan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
