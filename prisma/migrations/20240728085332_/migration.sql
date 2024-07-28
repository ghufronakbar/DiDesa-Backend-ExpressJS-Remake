/*
  Warnings:

  - You are about to drop the column `hakPilih` on the `Warga` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Warga" DROP COLUMN "hakPilih";

-- CreateTable
CREATE TABLE "Vote" (
    "voteId" SERIAL NOT NULL,
    "wargaId" INTEGER NOT NULL,
    "calonKetuaId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("voteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_wargaId_key" ON "Vote"("wargaId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_calonKetuaId_key" ON "Vote"("calonKetuaId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_calonKetuaId_fkey" FOREIGN KEY ("calonKetuaId") REFERENCES "CalonKetua"("calonKetuaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "Warga"("wargaId") ON DELETE CASCADE ON UPDATE CASCADE;
