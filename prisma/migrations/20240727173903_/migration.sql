/*
  Warnings:

  - You are about to drop the column `lahan_peternakan` on the `InformasiDesa` table. All the data in the column will be lost.
  - You are about to drop the column `luas_lahan_pertanian` on the `InformasiDesa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InformasiDesa" DROP COLUMN "lahan_peternakan",
DROP COLUMN "luas_lahan_pertanian",
ADD COLUMN     "lahanPeternakan" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "luasLahanPertanian" DOUBLE PRECISION NOT NULL DEFAULT 0;
