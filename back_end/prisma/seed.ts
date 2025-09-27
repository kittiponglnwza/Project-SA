import { PrismaClient, SeatStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. สร้างโต๊ะ (Seat) ถ้ายังไม่มี
  const seatCount = await prisma.seat.count();
  if (seatCount === 0) {
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
    console.log('✅ Seats seeded');
  } else {
    console.log('ℹ️ Seats มีอยู่แล้ว ข้ามการสร้าง');
  }

  // 2. สร้างเมนู (Menu)
  const menuCount = await prisma.menu.count();
  if (menuCount === 0) {
    await prisma.menu.createMany({
      data: [
        { name: 'ขนมปังมาม่า', price: 25, category: 'ขนม', description: 'ขนมปังกรอบ รสชาติเข้มข้น', image: '/photo/bread.jpg', rating: 4.5 },
        { name: 'มันฝรั่งทอด', price: 35, category: 'ขนม', description: 'มันฝรั่งทอดกรอบ เสิร์ฟร้อน', image: '/photo/fries.jpg', rating: 4.8 },
        { name: 'โค้ก', price: 15, category: 'เครื่องดื่ม', description: 'โค้กเย็นๆ สดชื่น', image: '/photo/coke.jpg', rating: 4.7, hasPromo: true, hasHappyHour: true },
        { name: 'กาแฟเย็น', price: 25, category: 'เครื่องดื่ม', description: 'กาแฟเย็นหอมกรุ่น', image: '/photo/iced-coffee.jpg', rating: 4.4, hasHappyHour: true },
        { name: 'มาม่า', price: 15, category: 'อาหารสำเร็จรูป', description: 'บะหมี่กึ่งสำเร็จรูป รสต้มยำ', image: '/photo/mama.jpg', rating: 4.1 },
        { name: 'ข้าวผัดไข่', price: 45, category: 'อาหารสำเร็จรูป', description: 'ข้าวผัดไข่ อร่อยเหมือนทำเอง', image: '/photo/fried-rice.jpg', rating: 4.5, hasPromo: true },
        { name: 'ไอศกรีม', price: 20, category: 'ของหวาน', description: 'ไอศกรีมหลากหลายรส', image: '/photo/ice-cream.jpg', rating: 4.6 },
        { name: 'เค้กช็อกโกแลต', price: 40, category: 'ของหวาน', description: 'เค้กช็อกโกแลต หวานมัน', image: '/photo/chocolate-cake.jpg', rating: 4.8 },
      ],
    });
    console.log('✅ Menus seeded');
  } else {
    console.log('ℹ️ Menus มีอยู่แล้ว ข้ามการสร้าง');
  }

  // 3. สร้างโปรโมชั่น (Promotion)
  const promoCount = await prisma.promotion.count();
  if (promoCount === 0) {
    await prisma.promotion.createMany({
      data: [
        {
          name: 'Happy Hour',
          description: '14:00-17:00 น. ลด 20% ทุกเครื่องดื่ม',
          type: 'category',
          discount: 20,
          category: 'เครื่องดื่ม',
          startTime: '14:00',
          endTime: '17:00',
          icon: '⏰',
          isActive: true,
        },
        {
          name: 'เซ็ตขนมครบครัน',
          description: 'ซื้อ ป๊อปคอร์น + โค้ก ลด 10บ',
          type: 'combo',
          discount: 10,
          items: [3, 5], // popcorn + coke
          icon: '🍿',
          isActive: true,
        },
        {
          name: 'วันหยุดสุดคุ้ม',
          description: 'เสาร์-อาทิตย์ ซื้อ 2 ชิ้น ลด 25บ',
          type: 'quantity',
          discount: 25,
          validDays: [0, 6],
          icon: '🎉',
          isActive: true,
        },
        {
          name: 'ซื้อมากลดมาก',
          description: 'ซื้อครบ 150บ ลด 20บ',
          type: 'amount',
          discount: 20,
          icon: '💰',
          isActive: true,
        },
      ],
    });
    console.log('✅ Promotions seeded');
  } else {
    console.log('ℹ️ Promotions มีอยู่แล้ว ข้ามการสร้าง');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
