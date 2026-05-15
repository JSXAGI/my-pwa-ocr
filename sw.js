// sw.js - サービスワーカー（オフライン動作のための裏方さん）
const CACHE_NAME = 'ocr-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // アイコンがある場合
];

// インストール時にファイルをキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// キャッシュがあればそこから読み込み、なければネットから取得する
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});