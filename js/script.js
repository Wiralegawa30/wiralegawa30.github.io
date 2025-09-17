// -------------------
// Fade helper + slideshow (safe & preloading)
// -------------------

// Ambil elemen (pastikan id unik di HTML)
const cardImage1 = document.getElementById("card-1");
const cardImage2 = document.getElementById("card-2");
const cardImage3 = document.getElementById("card-3");
const cardImage4 = document.getElementById("card-4"); // pastikan ada di HTML

// Daftar gambar (sama seperti milikmu)
const imageList1 = ["img/projects/sistem-informasi-keuangan.jpg", "img/projects/login-sik.png", "img/projects/cb-pemasukan.png", "img/projects/cb-hutang.png", "img/projects/cb-report.png"];
const imageList2 = ["img/projects/login-cemerlang-key.png", "img/projects/admin-landing-page.jpg", "img/projects/galeri-ck.png", "img/projects/layanan-ck.png", "img/projects/video-ck.png"];
const imageList3 = ["img/projects/a1.JPG", "img/projects/a2.JPG", "img/projects/a3.JPG"];
const imageList4 = ["img/projects/b1.PNG", "img/projects/b2.PNG", "img/projects/b3.PNG", "img/projects/b4.PNG"];

// Indeks
let currentIndex1 = 0;
let currentIndex2 = 0;
let currentIndex3 = 0;
let currentIndex4 = 0;

// Helper: fade image to a new src dengan preloading
function fadeToImage(imgEl, newSrc, duration = 600) {
  if (!imgEl) return; // guard
  // Pastikan transition di-set (CSS juga harus ada)
  imgEl.style.transition = `opacity ${duration}ms ease-in-out`;

  // Preload gambar
  const pre = new Image();
  pre.src = newSrc;

  pre.onload = function () {
    // fade out
    imgEl.style.opacity = 0;

    // Tunggu sampai transition opacity selesai, lalu ganti src dan fade in
    const onTransitionEnd = function (e) {
      // hanya tangani property 'opacity'
      if (e.propertyName && e.propertyName !== 'opacity') return;
      imgEl.removeEventListener('transitionend', onTransitionEnd);

      // Ganti sumber gambar ke gambar yang sudah ter-preload
      imgEl.src = newSrc;

      // Force repaint & lalu fade-in
      requestAnimationFrame(() => {
        // sedikit delay agar src diterapkan/dirender
        imgEl.style.opacity = 1;
      });
    };

    imgEl.addEventListener('transitionend', onTransitionEnd);

    // Fallback (jika transitionend tidak terjadi)
    setTimeout(() => {
      imgEl.removeEventListener('transitionend', onTransitionEnd);
      if (imgEl.src.indexOf(newSrc) === -1) {
        imgEl.src = newSrc;
        imgEl.style.opacity = 1;
      }
    }, duration + 200);
  };

  // Jika preload error (gambar tidak ditemukan), kita tetap coba ganti tapi jangan crash
  pre.onerror = function () {
    console.warn("Failed to preload image:", newSrc);
    // langsung ganti dan tampilkan
    imgEl.src = newSrc;
    imgEl.style.opacity = 1;
  };
}

// Fungsi perubahan tiap card
function changeImageCard1() {
  if (!cardImage1 || !imageList1 || imageList1.length === 0) return;
  const next = imageList1[currentIndex1];
  fadeToImage(cardImage1, next, 600);
  currentIndex1 = (currentIndex1 + 1) % imageList1.length;
}

function changeImageCard2() {
  if (!cardImage2 || !imageList2 || imageList2.length === 0) return;
  const next = imageList2[currentIndex2];
  fadeToImage(cardImage2, next, 600);
  currentIndex2 = (currentIndex2 + 1) % imageList2.length;
}

function changeImageCard3() {
  if (!cardImage3 || !imageList3 || imageList3.length === 0) return;
  const next = imageList3[currentIndex3];
  fadeToImage(cardImage3, next, 600);
  currentIndex3 = (currentIndex3 + 1) % imageList3.length;
}

function changeImageCard4() {
  if (!cardImage4 || !imageList4 || imageList4.length === 0) return;
  const next = imageList4[currentIndex4];
  fadeToImage(cardImage4, next, 600);
  currentIndex4 = (currentIndex4 + 1) % imageList4.length;
}

// Mulai interval (atur sesuai keinginan)
setInterval(changeImageCard1, 4000);
setInterval(changeImageCard2, 3000);
setInterval(changeImageCard3, 5000);
setInterval(changeImageCard4, 5000);

// ---------- Gallery modal (Bootstrap) ----------
(function () {
  const galleryThumbs = Array.from(document.querySelectorAll('.gallery-item img'));
  if (galleryThumbs.length === 0) return;

  const modalEl = document.getElementById('galleryModal');
  const modal = new bootstrap.Modal(modalEl);
  const modalImg = document.getElementById('galleryModalImg');
  const modalCaption = document.getElementById('galleryModalCaption');
  let currentIndex = 0;

  function openModal(index) {
    const img = galleryThumbs[index];
    modalImg.src = img.src;
    modalImg.alt = img.alt || "";
    modalCaption.textContent = img.alt || "";
    currentIndex = index;
    modal.show();
  }

  galleryThumbs.forEach((img, idx) => {
    img.tabIndex = 0; // keyboard focusable
    img.addEventListener('click', () => openModal(idx));
    img.addEventListener('keypress', (e) => { if (e.key === 'Enter') openModal(idx); });
  });

  document.getElementById('prevBtn').addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + galleryThumbs.length) % galleryThumbs.length;
    openModal(currentIndex);
  });

  document.getElementById('nextBtn').addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % galleryThumbs.length;
    openModal(currentIndex);
  });

  // Keyboard navigation while modal open
  document.addEventListener('keydown', function (e) {
    if (!modalEl.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') document.getElementById('prevBtn').click();
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
  });
})();