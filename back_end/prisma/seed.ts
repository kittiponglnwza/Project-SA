import { PrismaClient, SeatStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const seats = [
    ...Array.from({ length: 10 }, (_, i) => ({
      zone: 'A',
      type: i % 2 === 0 ? 'เดี่ยว' : 'คู่',
      status: SeatStatus.AVAILABLE,
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      zone: 'B',
      type: i % 2 === 0 ? 'เดี่ยว' : 'คู่',
      status: SeatStatus.AVAILABLE,
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      zone: 'C',
      type: i % 2 === 0 ? 'เดี่ยว' : 'คู่',
      status: SeatStatus.AVAILABLE,
    })),
    ...Array.from({ length: 4 }, () => ({
      zone: 'VIP',
      type: 'คู่',
      status: SeatStatus.AVAILABLE,
    })),
    ...Array.from({ length: 2 }, () => ({
      zone: 'Room',
      type: 'ห้องส่วนตัว',
      status: SeatStatus.AVAILABLE,
    })),
  ];

  await prisma.seat.createMany({ data: seats });
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
