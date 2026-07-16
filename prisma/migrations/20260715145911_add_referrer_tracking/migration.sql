-- AlterTable
ALTER TABLE "SurveySession" ADD COLUMN "referrer" TEXT DEFAULT 'Direct';
ALTER TABLE "SurveySession" ADD COLUMN "utmCampaign" TEXT;
ALTER TABLE "SurveySession" ADD COLUMN "utmMedium" TEXT;
ALTER TABLE "SurveySession" ADD COLUMN "utmSource" TEXT;
