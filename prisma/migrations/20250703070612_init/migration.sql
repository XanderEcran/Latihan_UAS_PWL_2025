/*
  Warnings:

  - You are about to drop the column `judul_kegiatan` on the `kegiatan` table. All the data in the column will be lost.
  - Added the required column `judulKegiatan` to the `kegiatan` table without a default value. This is not possible if the table is not empty.

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
    "tautanPendaftaran" TEXT,
    CONSTRAINT "kegiatan_idOrganisasi_fkey" FOREIGN KEY ("idOrganisasi") REFERENCES "organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_kegiatan" ("deskripsiSingkat", "id", "idOrganisasi", "jenisKegiatan", "lokasi", "tanggalKegiatan", "tautanPendaftaran") SELECT "deskripsiSingkat", "id", "idOrganisasi", "jenisKegiatan", "lokasi", "tanggalKegiatan", "tautanPendaftaran" FROM "kegiatan";
DROP TABLE "kegiatan";
ALTER TABLE "new_kegiatan" RENAME TO "kegiatan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
