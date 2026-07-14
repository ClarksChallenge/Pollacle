-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SurveyCompletion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fundraiserId" TEXT NOT NULL,
    "userId" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'CPX Research',
    "transactionId" TEXT,
    "rewardAmount" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'STARTED',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    CONSTRAINT "SurveyCompletion_fundraiserId_fkey" FOREIGN KEY ("fundraiserId") REFERENCES "Fundraiser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SurveyCompletion" ("completedAt", "fundraiserId", "id", "provider", "rewardAmount", "status", "transactionId", "userId") SELECT "completedAt", "fundraiserId", "id", "provider", "rewardAmount", "status", "transactionId", "userId" FROM "SurveyCompletion";
DROP TABLE "SurveyCompletion";
ALTER TABLE "new_SurveyCompletion" RENAME TO "SurveyCompletion";
CREATE UNIQUE INDEX "SurveyCompletion_transactionId_key" ON "SurveyCompletion"("transactionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
