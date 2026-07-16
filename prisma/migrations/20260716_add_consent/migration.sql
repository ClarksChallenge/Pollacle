-- Add Consent table
CREATE TABLE IF NOT EXISTS "Consent" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "userId" TEXT,
  "email" TEXT,
  "purpose" TEXT NOT NULL,
  "value" INTEGER NOT NULL DEFAULT 1,
  "ip" TEXT,
  "userAgent" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY("userId") REFERENCES "User"("id") ON DELETE SET NULL
);
