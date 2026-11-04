// Укажи прямую ссылку на официальный установщик и ID вашего видео YouTube.
const SITE_CONFIG = {
  downloadUrl: '',
  youtubeVideoId: ''
};
const mobileButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  mobileButton.setAttribute('aria-expanded', String(open));
  mobileButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  mobileButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('.copyright-year').forEach(el => el.textContent = String(new Date().getFullYear()));
const dialog = document.getElementById('download-dialog');
document.querySelectorAll('.download-trigger').forEach(button => button.addEventListener('click', () => {
  if (/^https:\/\/\S+$/i.test(SITE_CONFIG.downloadUrl)) {
    window.location.assign(SITE_CONFIG.downloadUrl);
  } else if (dialog?.showModal) {
    dialog.showModal();
  } else {
    window.location.assign('https://t.me/lmnprj');
  }
}));
dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
const video = document.getElementById('video-container');
if (video && /^[A-Za-z0-9_-]{11}$/.test(SITE_CONFIG.youtubeVideoId)) {
  const frame = document.createElement('iframe');
  frame.src = 'https://www.youtube-nocookie.com/embed/' + SITE_CONFIG.youtubeVideoId;
  frame.title = 'Официальный обзор ALL FICTION';
  frame.loading = 'lazy';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allowFullscreen = true;
  video.replaceChildren(frame);
}
