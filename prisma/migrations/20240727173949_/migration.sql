/*
  Warnings:

  - You are about to drop the column `luasLahanPertanian` on the `InformasiDesa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InformasiDesa" DROP COLUMN "luasLahanPertanian",
ADD COLUMN     "lahanPertanian" DOUBLE PRECISION NOT NULL DEFAULT 0;
