-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "refresh_token" DROP NOT NULL,
ALTER COLUMN "access_token" DROP NOT NULL;
