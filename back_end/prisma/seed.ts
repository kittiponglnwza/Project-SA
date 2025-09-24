import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const seats = [
    // Zone A (10 โต๊ะ)
    ...Array.from({ length: 10 }, (_, i) => ({
      zone: 'A',
      type: i % 2 === 0 ? 'เดี่ยว' : 'คู่',
      status: 'ว่าง',
      condition: 'ดีเยี่ยม',
    })),
    // Zone B (8 โต๊ะ)
    ...Array.from({ length: 8 }, (_, i) => ({
      zone: 'B',
      type: i % 2 === 0 ? 'เดี่ยว' : 'คู่',
      status: 'ว่าง',
      condition: 'ดีเยี่ยม',
    })),
    // Zone C (6 โต๊ะ)
    ...Array.from({ length: 6 }, (_, i) => ({
      zone: 'C',
      type: i % 2 === 0 ? 'เดี่ยว' : 'คู่',
      status: 'ว่าง',
      condition: 'ดีเยี่ยม',
    })),
    // Zone VIP (4 โต๊ะ)
    ...Array.from({ length: 4 }, (_, i) => ({
      zone: 'VIP',
      type: 'คู่',
      status: 'ว่าง',
      condition: 'ดีเยี่ยม',
    })),
    // Zone Room (2 ห้อง)
    ...Array.from({ length: 2 }, (_, i) => ({
      zone: 'Room',
      type: 'ห้องส่วนตัว',
      status: 'ว่าง',
      condition: 'ดีเยี่ยม',
    })),
  ];

  await prisma.seat.createMany({
    data: seats,
  });

  console.log('✅ Seeding สำเร็จ! สร้างโต๊ะทั้งหมดแล้ว');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
