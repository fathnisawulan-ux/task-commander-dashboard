# Task Commander Dashboard 🚀

Dashboard manajemen tugas interaktif untuk mengelola 11 bisnis dengan Eisenhower Matrix, Kanban Board, Calendar View, dan lebih banyak lagi!

## ✨ Fitur Utama

- 🧭 **Eisenhower Matrix** - Prioritas Urgent vs Important
- 📋 **Multiple Views** - Eisenhower, Kanban, List, Calendar
- 📊 **Dashboard Metrics** - Real-time tracking
- 🏢 **Business Management** - 11 bisnis terintegrasi
- 📂 **Category Filtering** - Kerja, Ibadah, Personal
- ⏱️ **Time Tracking** - Hours spent vs estimated
- 📈 **Progress Tracking** - Visual progress indicators
- 📅 **Deadline Management** - Calendar & deadline tracking
- 🎯 **Monthly Goals** - Target bulanan & tracking
- 👥 **Task Assignment** - Managed By (Fani, Pak Mario)
- 💾 **Data Persistence** - Auto-save ke browser

## 🚀 Quick Start - Deploy ke Vercel

### Step 1: Setup GitHub Repository

1. **Create GitHub Account** (jika belum)
   - Go to https://github.com
   - Sign up atau login

2. **Create New Repository**
   - Click **+** icon → **New repository**
   - Repository name: `task-commander-dashboard`
   - Description: "Task management dashboard for 11 businesses"
   - Public atau Private (pilih sesuai preferensi)
   - Click **Create repository**

### Step 2: Upload Files ke GitHub

**Option A: Via GitHub Web (Paling Mudah)**

1. Di repository Anda, click **Add file** → **Upload files**
2. Drag & drop semua file berikut ke folder:
   ```
   ├── package.json
   ├── next.config.js
   ├── tailwind.config.js
   ├── postcss.config.js
   ├── .gitignore
   ├── README.md
   ├── app/
   │   ├── layout.tsx
   │   ├── page.tsx
   │   ├── globals.css
   │   └── components/
   │       └── TaskDashboard.tsx
   ```

3. Click **Commit changes**

**Option B: Via Command Line (Lebih Cepat)**

```bash
# 1. Install Git (jika belum)
# Windows: https://git-scm.com/download/win
# Mac: brew install git

# 2. Navigate ke folder project
cd /path/to/task-commander-dashboard

# 3. Initialize git repository
git init
git add .
git commit -m "Initial commit: Task Commander Dashboard"

# 4. Add remote repository (ganti YOUR_USERNAME dengan GitHub username Anda)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/task-commander-dashboard.git

# 5. Push ke GitHub
git push -u origin main
```

### Step 3: Deploy ke Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click **Sign Up** atau **Login**
   - Sign up dengan GitHub account Anda

2. **Create New Project**
   - Click **New Project**
   - Select repository `task-commander-dashboard`
   - Framework: **Next.js** (akan auto-detect)
   - Root Directory: `.` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Environment Variables: (skip untuk sekarang)

3. **Deploy**
   - Click **Deploy**
   - Wait sampai build selesai (biasanya 2-5 menit)
   - Anda akan dapat **Vercel Domain** yang bisa di-share!

### Step 4: Share Dashboard

Setelah deploy sukses:
- Copy link domain (misal: `task-commander-dashboard.vercel.app`)
- Share ke Fani dan Pak Mario
- Mereka bisa akses langsung tanpa install apapun!

---

## 📱 Akses Lokal (Development Mode)

Jika ingin test di komputer sebelum deploy:

### Prerequisites
- Node.js 16+ (download: https://nodejs.org)
- Git

### Setup

1. **Clone repository Anda**
```bash
git clone https://github.com/YOUR_USERNAME/task-commander-dashboard.git
cd task-commander-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

---

## 🎯 Cara Menggunakan Dashboard

### Membuat Task
1. Klik **"+ New Task"** di header
2. Isi semua field:
   - Task Title (required)
   - Description (optional)
   - Business (11 pilihan)
   - Managed By (Fani / Pak Mario)
   - Category (Kerja / Ibadah / Personal)
   - Priority (High / Medium / Low)
   - Urgent (checkbox)
   - Deadline (date picker)
   - Time Estimate (hours)
3. Click **Create Task**

### Menggunakan Eisenhower Matrix
- **Do First** (Merah): Urgent & Important - kerjakan sekarang!
- **Schedule** (Biru): Not Urgent & Important - jadwalkan dengan baik
- **Delegate** (Kuning): Urgent & Not Important - bisa didelegasikan
- **Eliminate** (Abu): Not Urgent & Not Important - bisa dihapus

### Update Progress
- Drag progress slider (0-100%)
- Update time spent (hours)
- Change status (To-do → In Progress → Done)

### Filter Tasks
- **By Business**: Pilih salah satu dari 11 bisnis
- **By Category**: Kerja, Ibadah, atau Personal
- **By Manager**: Fani atau Pak Mario

### Switch Views
- **Eisenhower** (⚡): Matrix view untuk prioritas
- **Kanban** (📋): Kanban board (To-do, In Progress, Done)
- **List** (📝): Table view dengan detail lengkap
- **Calendar** (📅): Timeline berdasarkan deadline

### Set Monthly Goals
1. Click **"+ Add Goal"** di section Monthly Goals
2. Input goal Anda
3. Track progress dengan checkbox
4. Delete jika sudah tercapai

---

## 🔒 Data Security & Storage

- Semua data tersimpan di **browser local storage**
- TIDAK ada data yang dikirim ke server
- TIDAK perlu login atau authentication
- Data aman dan private
- Backup data dengan export manual jika perlu

---

## 🆘 Troubleshooting

### Masalah: Build gagal di Vercel
- Pastikan `package.json` dan semua file sudah ter-upload dengan benar
- Cek bahwa folder `app/` ada dengan struktur yang benar

### Masalah: Dashboard tidak bisa di-akses setelah deploy
- Tunggu 5-10 menit (Vercel perlu waktu untuk deploy)
- Coba refresh browser
- Cek status di Vercel dashboard

### Masalah: Data hilang setelah refresh
- Cek browser localStorage settings
- Private/Incognito mode tidak menyimpan data
- Gunakan mode normal untuk akses yang persistent

### Masalah: Cannot find module 'lucide-react'
```bash
npm install lucide-react
```

---

## 📧 Support

Jika ada pertanyaan atau masalah:
1. Check dokumentasi Vercel: https://vercel.com/docs
2. Check Next.js docs: https://nextjs.org/docs
3. Check Tailwind docs: https://tailwindcss.com/docs

---

## 🎉 Selamat!

Dashboard Anda sudah siap untuk mengelola 11 bisnis dengan lebih efektif dan produktif! 🚀

**Tip**: Mulai dengan Eisenhower Matrix untuk prioritasi yang jelas, kemudian gunakan Kanban view untuk daily tracking.

**Let's conquer those tasks! 💪**
