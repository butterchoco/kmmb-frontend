# KMMB 2020 Website

Konferensi Mahasiswa Merdeka Belajar (disingkat: KMMB) 2020 merupakan acara yang diadakan oleh BEM KM Fakultas Psikologi Universitas Airlangga sebagai wadah bagi mahasiswa untuk mengaktualisasikan diri, menampilkan kemampuannya, serta menginisiasi dukungan dan kontribusi mahasiswa melalui peranannya sebagai pemuda merdeka untuk berinovasi dan berkreasi tanpa batas.

## Framework dan Teknologi

Beberapa framework dan teknologi diperlukan untuk membangun sebuah website ini, yaitu:

- Firebase Authentication
- Firebase Hosting
- Firestore
- Firebase Storage
- Next JS

## Instalasi

Pastikan anda mempunyai package manager, npm atau yarn. Jika belum memiliki keduanya, install terlebih dahulu salah satu package manager tersebut. Lakukan instalasi dengan memasukkan perintah berikut ke dalaam terminal anda.

Untuk NPM Package Manager:

```
npm install
```

Untuk Yarn Package Manager:

```
yarn install
```

## Run Server Development

Untuk menjalankan server di development, masukkan perintah:

Untuk NPM Package Manager:

```
npm run dev
```

Untuk Yarn Package Manager:

```
yarn dev
```

## Deployment

Untuk men-deploy hasil project ke production, maka kita perlu build dahulu project yang ada.
Masukkan perintah berikut ke dalam terminal kita:

Untuk NPM Package Manager:

```
npm run build
npm run export
```

Untuk Yarn Package Manager:

```
yarn build
yarn export
```

Jika berhasil, maka akan ada folder bernama out yang berisi file html dan folder-folder yang dibutuhkan untuk deploy ke production.
Untuk deploy, kita perlu memasukkan perintah:

Untuk NPM Package Manager:

```
npm run deploy
```

Untuk Yarn Package Manager:

```
yarn deploy
```
