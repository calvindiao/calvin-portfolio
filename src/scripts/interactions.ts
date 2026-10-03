// Theme switch: follows the system until the visitor picks a side, then remembers it.
const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const themeSwitch = document.querySelector<HTMLButtonElement>('[data-theme-switch]');
const effectiveTheme = () => root.dataset.theme ?? (systemDark.matches ? 'dark' : 'light');
function syncThemeSwitch() { themeSwitch?.setAttribute('aria-checked', String(effectiveTheme() === 'dark')); }
themeSwitch?.addEventListener('click', () => {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch { /* storage can be unavailable; the choice still applies to this page */ }
  syncThemeSwitch();
});
systemDark.addEventListener('change', syncThemeSwitch);
syncThemeSwitch();

// Demo videos load only when asked for, from YouTube's privacy-enhanced domain.
function stopVideo(container: HTMLElement) {
  container.querySelector('iframe')?.remove();
  container.querySelector('.stop-video')?.remove();
  container.classList.remove('playing');
  container.querySelectorAll<HTMLElement>('[data-watch]').forEach(button => { button.hidden = false; });
}
function playVideo(container: HTMLElement) {
  const id = container.dataset.video;
  if (!id || !/^[\w-]{11}$/.test(id) || container.querySelector('iframe')) return;
  document.querySelectorAll<HTMLElement>('[data-video].playing').forEach(stopVideo);
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  iframe.title = container.dataset.videoTitle || 'Project demo video';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'stop-video';
  close.textContent = 'Close video';
  close.addEventListener('click', () => {
    stopVideo(container);
    container.querySelector<HTMLElement>('[data-watch]')?.focus();
  });
  container.classList.add('playing');
  container.append(iframe, close);
  container.querySelectorAll<HTMLElement>('[data-watch]').forEach(button => { button.hidden = true; });
  iframe.focus();
}
document.querySelectorAll<HTMLElement>('[data-video]').forEach(container => {
  container.querySelectorAll<HTMLElement>('[data-watch]').forEach(button => button.addEventListener('click', () => playVideo(container)));
});

// Image lightbox, returning focus to whatever opened it.
const lightbox = document.querySelector<HTMLDialogElement>('.lightbox');
let lightboxTrigger: HTMLElement | null = null;
if (lightbox) {
  const image = lightbox.querySelector('img')!;
  const caption = lightbox.querySelector('.lightbox-caption')!;
  document.querySelectorAll<HTMLElement>('[data-image]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      image.src = trigger.dataset.image!;
      image.alt = trigger.dataset.alt || 'Project image';
      caption.textContent = image.alt;
      lightboxTrigger = trigger;
      lightbox.showModal();
      root.classList.add('image-open');
    });
  });
  lightbox.querySelector('.lightbox-close')!.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => {
    root.classList.remove('image-open');
    image.removeAttribute('src');
    lightboxTrigger?.focus();
  });
}

// Copy the email address; if the clipboard is unavailable, select it so it can be copied by hand.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button => {
  const label = button.querySelector<HTMLElement>('[data-copy-label]');
  const original = label?.textContent ?? '';
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy!);
      if (label) label.textContent = 'Copied';
      window.setTimeout(() => { if (label) label.textContent = original; }, 2000);
    } catch {
      const address = button.parentElement?.querySelector('a');
      if (!address) return;
      const range = document.createRange();
      range.selectNodeContents(address);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      if (label) label.textContent = 'Press Ctrl+C to copy';
    }
  });
});
