# Pahlawan140

frontend website yang digunakan oleh BPS Kabupaten Sidoarjo untuk branding dan mempermudah pekerjaan pegawai.
- **Beranda** : Branding website
- **Profil & Berita** : Struktur organisasi, pengenalan BPS Sidoarjo, dan menampilkan video terbaru
- **ZI-RB & Teman Luki** : Menampilkan progress dengan embed looker google studio
- **Ruang Baca** : Berisi bacaan terkait BPS Sidoarjo
- **MyOffice** : Kumpulan link yang digunakan untuk pekerjaan
- **Admin Pane** : Mengatur segala isi sistem
- **Survei kepuasan sistem** : menggunakan tally
- **AyoMagang** : Sistem pendaftaran magang di BPS Sidoarjo
  
## Tentang Sistem

- **React JS** : Library untuk antarmuka pengguna.
- **Axios**: Library untuk mengambil data dari API.
- **Next UI, Ant Design, Material UI**: Library untuk komponen pembangun antarmuka
- **Framer Motion**: Library untuk memberikan animasi.

## Cara Penggunaan?

**Clone / download repository**

```shell
# Clone Repository
$ git clone https://github.com/nym570/pahlawan140.git
```

**Masuk ke folder proyek dan install dependensi**

```shell
# install dependency
$ npm install
```

**Jalankan proyek**

```shell
# Pengembangan lokal
$ npm run dev
```
```shell
# Pengembangan produksi
$ npm run build
```

## Struktur Proyek

```shell
pahlawan140/
│
├── dist/                 # Folder build untuk file hasil build produksi
├── node_modules/         # Folder berisi dependensi proyek
├── public/               # Folder untuk file publik (misalnya gambar, file dll.)
├── src/                  # Folder utama kode sumber
│   ├── assets/           # Folder untuk aset lain.
│   ├── components/       # Folder untuk komponen React
│   ├── hooks/            # Folder untuk custom hooks React
│   ├── pages/            # Folder untuk halaman React
│   ├── utils/            # Folder untuk fungsi utilitas
│   ├── App.jsx           # Komponen utama aplikasi React
│   ├── index.css         # File CSS utama
│   ├── main.jsx          # Entry point aplikasi React
│   └── config.jsx        # konfigurasi link api
├── .eslintrc.cjs         # Konfigurasi ESLint
├── .gitignore            # File untuk menentukan file/folder yang diabaikan oleh Git
├── .htaccess             # File konfigurasi untuk server Apache
├── index.html            # File HTML utama
├── package-lock.json     # File penguncian dependensi
├── package.json          # File yang berisi metadata proyek dan daftar dependensi
├── postcss.config.js     # Konfigurasi untuk PostCSS
├── README.md             # Dokumentasi proyek
├── tailwind.config.js    # Konfigurasi untuk Tailwind CSS
├── vercel.json           # Konfigurasi untuk Vercel (platform hosting)
└── vite.config.js        # Konfigurasi untuk Vite (build tool)
```
