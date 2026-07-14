-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fundraiser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "goalAmount" REAL NOT NULL,
    "amountRaised" REAL NOT NULL DEFAULT 0,
    "surveySupporters" INTEGER NOT NULL DEFAULT 0,
    "cashDonations" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "coverImage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Fundraiser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Fundraiser" ("amountRaised", "cashDonations", "category", "coverImage", "createdAt", "goalAmount", "id", "slug", "status", "story", "surveySupporters", "title", "updatedAt", "userId") SELECT "amountRaised", "cashDonations", "category", "coverImage", "createdAt", "goalAmount", "id", "slug", "status", "story", "surveySupporters", "title", "updatedAt", "userId" FROM "Fundraiser";
DROP TABLE "Fundraiser";
ALTER TABLE "new_Fundraiser" RENAME TO "Fundraiser";
CREATE UNIQUE INDEX "Fundraiser_slug_key" ON "Fundraiser"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
