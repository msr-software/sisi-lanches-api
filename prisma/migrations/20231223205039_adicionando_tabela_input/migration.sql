/*
  Warnings:

  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INCOME', 'OUTCOME', 'PERSONAL');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "inputs" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "type" "Type" NOT NULL,
    "value" BIGINT NOT NULL,

    CONSTRAINT "inputs_pkey" PRIMARY KEY ("id")
);
