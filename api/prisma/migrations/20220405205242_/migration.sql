-- DropIndex
DROP INDEX "Bill.billNumber_unique";

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "phoneNumber" DROP NOT NULL;
