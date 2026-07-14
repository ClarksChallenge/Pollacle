-- CreateTable
CREATE TABLE "SurveySession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fundraiserId" TEXT NOT NULL,
    "userId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'STARTED',
    "provider" TEXT NOT NULL DEFAULT 'CPX Research',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    CONSTRAINT "SurveySession_fundraiserId_fkey" FOREIGN KEY ("fundraiserId") REFERENCES "Fundraiser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
