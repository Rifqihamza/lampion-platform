# 🏮 Lampion Platform

> Platform Belajar Modern dengan Roadmap Terstruktur dan AI Assistant

Lampion Platform adalah platform pembelajaran open-source yang dirancang untuk membantu pengguna belajar skill apapun dengan roadmap terstruktur, progress tracking, dan bantuan AI Assistant yang personal.

Dibangun dengan standar produksi terbaik, 100% Type Safe, dan siap untuk di scale.

---

## ✨ Fitur Utama

### 🔐 Sistem Autentikasi Lengkap

- ✅ Login dengan Email & Password
- ✅ Login Google OAuth
- ✅ Verifikasi Email
- ✅ Lupa Password + Reset Password
- ✅ Proteksi route otomatis
- ✅ JWT Session 30 hari
- ✅ Rate Limiter anti brute force

### ⚙️ Manajemen Akun

- ✅ Ubah Password
- ✅ Ubah Alamat Email
- ✅ Kirim ulang verifikasi email
- ✅ Hapus Akun Permanen
- ✅ Banner peringatan email belum terverifikasi

### 📚 Platform Pembelajaran

- ✅ 12+ Kategori Belajar
- ✅ 25+ Roadmap terstruktur
- ✅ 100+ Milestone pembelajaran
- ✅ Progress Tracking per user
- ✅ Enrollment system
- ✅ AI Assistant per milestone

### 🛡️ Keamanan

- ✅ Validasi environment variable saat startup
- ✅ Input Sanitization anti XSS & Injection
- ✅ Security Headers + CORS Policy
- ✅ Password hashing dengan bcrypt
- ✅ Semua endpoint API terproteksi
- ✅ Tidak ada `any` di seluruh codebase

---

## 🚀 Teknologi Yang Digunakan

| Layer     | Teknologi                             |
| --------- | ------------------------------------- |
| Framework | **Next.js 16 App Router + Turbopack** |
| Bahasa    | **TypeScript 5**                      |
| ORM       | **Prisma 7**                          |
| Database  | **PostgreSQL / MariaDB**              |
| Auth      | **NextAuth v5**                       |
| UI        | **ShadCN UI + Tailwind CSS 4**        |
| Animasi   | **Framer Motion + GSAP**              |
| AI        | **OpenAI GPT 4o**                     |
| Testing   | **Vitest + Testing Library**          |
| Email     | **Nodemailer**                        |
| Validasi  | **Zod**                               |

---

## 📄 Halaman Yang Tersedia

| Route                 | Deskripsi                |
| --------------------- | ------------------------ |
| `/`                   | Landing Page             |
| `/login`              | Halaman Login            |
| `/register`           | Halaman Daftar           |
| `/forgot-password`    | Halaman Lupa Password    |
| `/reset-password`     | Halaman Reset Password   |
| `/verify-email`       | Halaman Verifikasi Email |
| `/explore`            | Eksplorasi Roadmap       |
| `/dashboard`          | Dashboard User           |
| `/dashboard/settings` | Pengaturan Akun          |
| `/dashboard/profile`  | Profile User             |
| `/roadmap/[slug]`     | Detail Roadmap           |

---

## 📦 Struktur Project

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth Routes Group
│   ├── (dashboard)/        # Dashboard Routes Group
│   ├── (main)/             # Public Routes Group
│   ├── actions/            # Server Actions
│   └── api/                # API Routes
├── components/
│   ├── ui/                 # ShadCN UI Components
│   ├── shared/             # Shared Components
│   ├── features/           # Feature Components
│   └── sections/           # Page Sections
├── lib/                    # Utility Library
│   ├── auth.ts             # NextAuth Config
│   ├── prisma.ts           # Prisma Client
│   ├── env.ts              # Environment Validation
│   ├── api-response.ts     # Standard API Response
│   ├── rate-limiter.ts     # Rate Limiter
│   ├── sanitize.ts         # Input Sanitization
│   └── email.ts            # Email Service
├── hooks/                  # Custom React Hooks
├── types/                  # TypeScript Types
├── proxy.tsx               # Next.js Middleware
└── test/                   # Testing Setup
```

---

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env.local
```

Isi semua variabel yang dibutuhkan di file `.env.local`

### 3. Setup Database

```bash
npx prisma migrate dev
```

### 4. Seed Data Contoh

```bash
npx prisma db seed
```

> Demo User: `demo@lampion.id` / `demo123`

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka `http://localhost:3000`

---

## 🧪 Testing

Jalankan test:

```bash
npm run test
```

Jalankan test dengan UI:

```bash
npm run test:ui
```

Lihat test coverage:

```bash
npm run test:coverage
```

---

## 🎯 Untuk Lomba

Ini adalah poin-poin unggulan project ini untuk penilaian lomba:

✅ **Arsitektur bersih, terstruktur dan mudah di scale**
✅ **Keamanan yang diperhatikan dari awal development**
✅ **Kualitas code yang tinggi mengikuti standar industri**
✅ **Semua fitur end to end working sempurna**
✅ **100% Type Safe tanpa satupun `any`**
✅ **Testing framework sudah terintegrasi**
✅ **Dokumentasi yang lengkap dan jelas**
✅ **User Experience yang smooth dan modern**
✅ **Performance yang optimal**

---

## 👥 Tim Pengembang

Dibuat dengan ❤️ untuk Lomba Software Development

---

> **"Terangilah jalan belajarmu dengan Lampion"**
