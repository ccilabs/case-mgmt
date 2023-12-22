/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_tags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ContactIndigenousPersonType" AS ENUM ('yes', 'no');

-- CreateEnum
CREATE TYPE "CommunicationCommunicationTypeType" AS ENUM ('PhoneCall', 'Email');

-- CreateEnum
CREATE TYPE "EngagementActivityType" AS ENUM ('Meeting', 'Presentation');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "authId" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_Post_tags";

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "altText" TEXT NOT NULL DEFAULT '',
    "document_filesize" INTEGER,
    "document_filename" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "category" JSONB NOT NULL DEFAULT '[]',
    "category_other" TEXT NOT NULL DEFAULT '',
    "last_name" TEXT NOT NULL DEFAULT '',
    "first_name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "indigenous_person" "ContactIndigenousPersonType",
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" TEXT NOT NULL,
    "contact" TEXT,
    "individual" TEXT,
    "communication_date" DATE,
    "communication_type" "CommunicationCommunicationTypeType",
    "notes" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "status" TEXT,
    "case_number" SERIAL NOT NULL,
    "geographic_area" TEXT,
    "issues" JSONB NOT NULL DEFAULT '[]',
    "rating" INTEGER,
    "feedback" TEXT,
    "action_taken_date" DATE,
    "date_closed" TIMESTAMP(3),
    "notes" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "id" TEXT NOT NULL,
    "activity" "EngagementActivityType",
    "location" TEXT NOT NULL DEFAULT '',
    "issues" JSONB NOT NULL DEFAULT '[]',
    "notes" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Contact_attachments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Case_attachments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Engagement_attachments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Communication_contact_idx" ON "Communication"("contact");

-- CreateIndex
CREATE INDEX "Communication_individual_idx" ON "Communication"("individual");

-- CreateIndex
CREATE UNIQUE INDEX "_Contact_attachments_AB_unique" ON "_Contact_attachments"("A", "B");

-- CreateIndex
CREATE INDEX "_Contact_attachments_B_index" ON "_Contact_attachments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Case_attachments_AB_unique" ON "_Case_attachments"("A", "B");

-- CreateIndex
CREATE INDEX "_Case_attachments_B_index" ON "_Case_attachments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Engagement_attachments_AB_unique" ON "_Engagement_attachments"("A", "B");

-- CreateIndex
CREATE INDEX "_Engagement_attachments_B_index" ON "_Engagement_attachments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_contact_fkey" FOREIGN KEY ("contact") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_individual_fkey" FOREIGN KEY ("individual") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Contact_attachments" ADD CONSTRAINT "_Contact_attachments_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Contact_attachments" ADD CONSTRAINT "_Contact_attachments_B_fkey" FOREIGN KEY ("B") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Case_attachments" ADD CONSTRAINT "_Case_attachments_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Case_attachments" ADD CONSTRAINT "_Case_attachments_B_fkey" FOREIGN KEY ("B") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Engagement_attachments" ADD CONSTRAINT "_Engagement_attachments_A_fkey" FOREIGN KEY ("A") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Engagement_attachments" ADD CONSTRAINT "_Engagement_attachments_B_fkey" FOREIGN KEY ("B") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
