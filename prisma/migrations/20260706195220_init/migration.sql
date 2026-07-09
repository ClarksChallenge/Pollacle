-- CreateTable
CREATE TABLE "Fundraiser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "goalAmount" REAL NOT NULL,
    "amountRaised" REAL NOT NULL DEFAULT 0,
    "surveySupporters" INTEGER NOT NULL DEFAULT 0,
    "cashDonations" INTEGER NOT NULL DEFAULT 0,
    "coverImage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fundraiser_slug_key" ON "Fundraiser"("slug");
