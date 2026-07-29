#!/usr/bin/env node
const required = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'DATABASE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'CPX_CALLBACK_SECRET',
  'FOUNDER_EMAIL',
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error('Missing production environment variables:');
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

console.log('Production environment variables look present.');
