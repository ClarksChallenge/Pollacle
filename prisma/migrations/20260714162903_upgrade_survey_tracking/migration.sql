-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SurveyCompletion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fundraiserId" TEXT NOT NULL,
    "userId" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'CPX Research',
    "transactionId" TEXT,
    "rewardAmount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SurveyCompletion_fundraiserId_fkey" FOREIGN KEY ("fundraiserId") REFERENCES "Fundraiser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SurveyCompletion" ("completedAt", "fundraiserId", "id", "provider", "rewardAmount") SELECT "completedAt", "fundraiserId", "id", "provider", "rewardAmount" FROM "SurveyCompletion";
DROP TABLE "SurveyCompletion";
ALTER TABLE "new_SurveyCompletion" RENAME TO "SurveyCompletion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
