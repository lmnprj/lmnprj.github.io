
/* =========================================
   LIMINAL PROJECT — Website Configuration
   ========================================= */

const SITE_CONFIG = {
  // Последняя версия установщика ALL FICTION
  downloadUrl:
    'https://github.com/lmnprj/lmnprj.github.io/releases/latest/download/ALL-FICTION-Setup.exe',

  // ID официального YouTube-обзора
  youtubeVideoId: '',

  // Контакты
  telegramUrl: 'https://t.me/lmnprj',
  youtubeUrl: 'https://www.youtube.com/@lmnprj',
  supportEmail: 'lmnpr@proton.me'
};

/* =========================================
   Mobile Navigation
   ========================================= */

const mobileButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileButton?.addEventListener('click', () => {
  if (!mobileMenu) return;

  const isOpen = mobileMenu.classList.toggle('open');

  mobileButton.setAttribute('aria-expanded', String(isOpen));
  mobileButton.setAttribute(
    'aria-label',
    isOpen ? 'Закрыть меню' : 'Открыть меню'
  );
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileButton?.setAttribute('aria-expanded', 'false');
    mobileButton?.setAttribute('aria-label', 'Открыть меню');
  });
});

/* =========================================
   Automatic Copyright Year
   ========================================= */

document.querySelectorAll('.copyright-year').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});

/* =========================================
   ALL FICTION — Installer Download
   ========================================= */

const downloadDialog = document.getElementById('download-dialog');

function downloadInstaller() {
  const url = SITE_CONFIG.downloadUrl.trim();

  if (/^https:\/\/github\.com\/[^/]+\/[^/]+\/releases\/latest\/download\/[^/?#]+$/i.test(url)) {
    window.location.assign(url);
    return;
  }

  if (downloadDialog?.showModal) {
    downloadDialog.showModal();
  } else {
    window.location.assign(SITE_CONFIG.telegramUrl);
  }
}

document.querySelectorAll('.download-trigger').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    downloadInstaller();
  });
});

downloadDialog
  ?.querySelector('.dialog-close')
  ?.addEventListener('click', () => {
    downloadDialog.close();
  });

downloadDialog?.addEventListener('click', event => {
  if (event.target === downloadDialog) {
    downloadDialog.close();
  }
});

/* =========================================
   ALL FICTION — YouTube Review
   ========================================= */

const videoContainer = document.getElementById('video-container');

function loadYouTubeReview() {
  const videoId = SITE_CONFIG.youtubeVideoId.trim();

  if (!videoContainer) return;

  // YouTube ID должен содержать 11 символов
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;

  const iframe = document.createElement('iframe');

  iframe.src =
    'https://www.youtube-nocookie.com/embed/' +
    encodeURIComponent(videoId);

  iframe.title = 'Официальный обзор ALL FICTION';
  iframe.loading = 'lazy';
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  videoContainer.replaceChildren(iframe);
}

loadYouTubeReview();
