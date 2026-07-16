const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.env.FOUNDER_EMAIL || 'founder@example.com';
  const name = process.env.FOUNDER_NAME || 'Founder';
  const fundraiserTitle = process.env.FOUNDER_FUNDRAISER_TITLE || "Founder's Fundraiser";

  console.log('Seeding founder user:', email);

  const user = await prisma.user.upsert({
    where: { email },
    update: { name },
    create: { email, name },
  });

  console.log('Founder user id:', user.id);

  const existing = await prisma.fundraiser.findFirst({ where: { userId: user.id } });
  if (existing) {
    console.log('Found existing fundraiser for founder:', existing.id);
  } else {
    const fund = await prisma.fundraiser.create({
      data: {
        userId: user.id,
        title: fundraiserTitle,
        slug: 'founder-fundraiser',
        story: 'Founder launch fundraiser (auto-seeded).',
        category: 'General',
        goalAmount: 100.0,
        amountRaised: 0,
        surveySupporters: 0,
        views: 0,
        status: 'ACTIVE',
      },
    });
    console.log('Created founder fundraiser id:', fund.id);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed', e);
  process.exit(1);
});
