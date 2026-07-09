-- CreateTable
CREATE TABLE "SurveyCompletion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fundraiserId" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'Pollacle Test Survey',
    "rewardAmount" REAL NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SurveyCompletion_fundraiserId_fkey" FOREIGN KEY ("fundraiserId") REFERENCES "Fundraiser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
