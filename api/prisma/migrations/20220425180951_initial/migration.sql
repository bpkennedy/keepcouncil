-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('COUNCIL_MEMBER', 'MAYOR', 'CITY_CLERK', 'CITY_ATTORNEY');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('APPROVE_MINUTES', 'ADJOURN', 'FIRST_READ', 'SECOND_READ', 'THIRD_READ', 'REPORT', 'PRESENT', 'ADD_BILL', 'ANNOUNCE', 'APPOINT', 'REAPPOINT', 'ACCEPT', 'SUSPEND', 'POSTPONE');

-- CreateEnum
CREATE TYPE "CommunicationType" AS ENUM ('EMAIL', 'MAIL');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" INTEGER,
    "ward" INTEGER,
    "personType" "PersonType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3),
    "name" VARCHAR(255) NOT NULL,
    "previewUrl" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "carried" BOOLEAN NOT NULL DEFAULT false,
    "action" "Action" NOT NULL,
    "initiatorId" INTEGER NOT NULL,
    "seconderId" INTEGER,
    "hearingFromCitizenId" INTEGER,
    "proclamationId" INTEGER,
    "resolutionId" INTEGER,
    "communicationId" INTEGER,
    "publicHearingId" INTEGER,
    "billId" INTEGER,
    "boardAppointmentId" INTEGER,
    "requestId" INTEGER,
    "announcementId" INTEGER,
    "meetingId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingFromCitizen" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "from" VARCHAR(255),
    "content" TEXT,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proclamation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "presentedTo" VARCHAR(255),
    "content" TEXT,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resolution" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "introducedDate" TIMESTAMP(3),
    "passDate" TIMESTAMP(3),
    "resolutionNumber" INTEGER NOT NULL,
    "resolutionTitle" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "introducedById" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dateReceived" TIMESTAMP(3),
    "from" VARCHAR(255),
    "content" TEXT,
    "communicationType" "CommunicationType" NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicHearing" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "topic" VARCHAR(255),
    "content" TEXT,
    "from" VARCHAR(255) NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "introducedDate" TIMESTAMP(3),
    "passDate" TIMESTAMP(3),
    "billNumber" INTEGER NOT NULL,
    "ordinance" VARCHAR(255),
    "content" TEXT,
    "introducedById" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardAppointment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiration" TIMESTAMP(3),
    "appointee" VARCHAR(255) NOT NULL,
    "appointedTo" VARCHAR(255),
    "referredById" INTEGER,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petitioner" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "acceptorId" INTEGER,
    "secondedById" INTEGER,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "announcerId" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "motionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MeetingToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resolution_Aye" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resolution_Nay" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Bill_Aye" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Bill_Nay" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person.email_unique" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HearingFromCitizen_motionId_unique" ON "HearingFromCitizen"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "Proclamation_motionId_unique" ON "Proclamation"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "Resolution_motionId_unique" ON "Resolution"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "Communication_motionId_unique" ON "Communication"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicHearing_motionId_unique" ON "PublicHearing"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_motionId_unique" ON "Bill"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardAppointment_motionId_unique" ON "BoardAppointment"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "Request_motionId_unique" ON "Request"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_motionId_unique" ON "Announcement"("motionId");

-- CreateIndex
CREATE UNIQUE INDEX "_MeetingToPerson_AB_unique" ON "_MeetingToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_MeetingToPerson_B_index" ON "_MeetingToPerson"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resolution_Aye_AB_unique" ON "_Resolution_Aye"("A", "B");

-- CreateIndex
CREATE INDEX "_Resolution_Aye_B_index" ON "_Resolution_Aye"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resolution_Nay_AB_unique" ON "_Resolution_Nay"("A", "B");

-- CreateIndex
CREATE INDEX "_Resolution_Nay_B_index" ON "_Resolution_Nay"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Bill_Aye_AB_unique" ON "_Bill_Aye"("A", "B");

-- CreateIndex
CREATE INDEX "_Bill_Aye_B_index" ON "_Bill_Aye"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Bill_Nay_AB_unique" ON "_Bill_Nay"("A", "B");

-- CreateIndex
CREATE INDEX "_Bill_Nay_B_index" ON "_Bill_Nay"("B");

-- AddForeignKey
ALTER TABLE "Motion" ADD FOREIGN KEY ("initiatorId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motion" ADD FOREIGN KEY ("seconderId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motion" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingFromCitizen" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingFromCitizen" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proclamation" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proclamation" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resolution" ADD FOREIGN KEY ("introducedById") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resolution" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resolution" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicHearing" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicHearing" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD FOREIGN KEY ("introducedById") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardAppointment" ADD FOREIGN KEY ("referredById") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardAppointment" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardAppointment" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY ("acceptorId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY ("secondedById") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD FOREIGN KEY ("announcerId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD FOREIGN KEY ("motionId") REFERENCES "Motion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetingToPerson" ADD FOREIGN KEY ("A") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetingToPerson" ADD FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resolution_Aye" ADD FOREIGN KEY ("A") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resolution_Aye" ADD FOREIGN KEY ("B") REFERENCES "Resolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resolution_Nay" ADD FOREIGN KEY ("A") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resolution_Nay" ADD FOREIGN KEY ("B") REFERENCES "Resolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Bill_Aye" ADD FOREIGN KEY ("A") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Bill_Aye" ADD FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Bill_Nay" ADD FOREIGN KEY ("A") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Bill_Nay" ADD FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
