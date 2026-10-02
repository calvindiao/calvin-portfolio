import { animate } from 'motion/mini';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const dialog = document.querySelector<HTMLDialogElement>('.image-dialog');
let imageTrigger: HTMLElement | null = null;
if (dialog) {
  document.querySelectorAll<HTMLElement>('[data-image]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      const image = dialog.querySelector('img')!;
      image.src = trigger.dataset.image!;
      image.alt = trigger.dataset.alt || 'Project image';
      dialog.querySelector('.dialog-caption')!.textContent = image.alt;
      imageTrigger = trigger;
      dialog.showModal();
      document.documentElement.classList.add('image-open');
    });
  });
  dialog.querySelector('button')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('image-open');
    dialog.querySelector('img')!.removeAttribute('src');
    imageTrigger?.focus();
  });
}

function stopVideo(container: HTMLElement) {
  container.querySelector('iframe')?.remove();
  container.querySelector('.stop-video')?.remove();
  container.classList.remove('playing');
  container.querySelectorAll<HTMLElement>('[data-watch]').forEach(button => button.hidden = false);
}
function playVideo(container: HTMLElement) {
  const id = container.dataset.video;
  if (!id || !/^[\w-]{11}$/.test(id)) return;
  if (container.querySelector('iframe')) return;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  iframe.title = container.dataset.videoTitle || 'Project demo video';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  const close = document.createElement('button');
  close.className = 'stop-video';close.textContent = 'Back to image';
  close.addEventListener('click', () => { stopVideo(container); container.querySelector<HTMLButtonElement>('[data-watch]')?.focus(); });
  container.append(iframe, close);
  container.classList.add('playing');
  container.querySelectorAll<HTMLElement>('[data-watch]').forEach(button => button.hidden = true);
  iframe.focus();
}
document.querySelectorAll<HTMLElement>('[data-video]').forEach(container => {
  container.querySelectorAll<HTMLElement>('[data-watch]').forEach(button => button.addEventListener('click', () => playVideo(container)));
});
document.querySelectorAll<HTMLButtonElement>('[data-watch-for]').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(`panel-${button.dataset.watchFor}`);
    const media = panel?.querySelector<HTMLElement>('[data-video]');
    if (media) playVideo(media);
  });
});
const workspace = document.querySelector<HTMLElement>('[data-workspace]');
const desktopMode = window.matchMedia('(min-width: 1001px)');
const compactFiles = window.matchMedia('(max-width: 600px)');
const windowOpeners = new Map<string, HTMLElement>();
const positions = new Map<HTMLElement, { x: number; y: number }>();
let windowLayer = 10;
function workspaceWindow(id: string) { return workspace?.querySelector<HTMLElement>(`[data-window="${id}"]`); }
function bringForward(win: HTMLElement) {
  workspace?.querySelectorAll('.window-active').forEach(item => item.classList.remove('window-active'));
  win.classList.add('window-active');
  win.style.zIndex = String(++windowLayer);
}
function openWindow(id: string, trigger?: HTMLElement, focus = true) {
  const win = workspaceWindow(id);
  if (!win) return;
  if (trigger) windowOpeners.set(id, trigger);
  const wasHidden = win.hidden;
  win.hidden = false;
  workspace?.querySelector<HTMLElement>(`[data-dock-indicator="${id}"]`)?.removeAttribute('hidden');
  workspace?.querySelector(`[data-open-window="${id}"]`)?.setAttribute('aria-expanded', 'true');
  bringForward(win);
  if (wasHidden && !reducedMotion.matches) animate(win, { opacity: [0, 1] }, { duration: 0.2 });
  if (focus) win.querySelector<HTMLElement>('button, a, [tabindex="0"]')?.focus();
}
function hideWindow(id: string) {
  const win = workspaceWindow(id);
  if (!win) return;
  win.querySelectorAll<HTMLElement>('[data-video]').forEach(stopVideo);
  win.hidden = true;
  workspace?.querySelector<HTMLElement>(`[data-dock-indicator="${id}"]`)?.setAttribute('hidden','');
  workspace?.querySelector(`[data-open-window="${id}"]`)?.setAttribute('aria-expanded', 'false');
  const trigger = windowOpeners.get(id);
  if (trigger && !trigger.closest('[hidden]')) trigger.focus();
  else workspace?.querySelector<HTMLButtonElement>(`[data-open-window="${id}"]`)?.focus();
}
function toggleMaximize(win: HTMLElement) {
  if (!desktopMode.matches) return;
  const expanded = win.classList.toggle('is-maximized');
  const button = win.querySelector<HTMLButtonElement>('[data-maximize]');
  button?.setAttribute('aria-pressed',String(expanded));
  button?.setAttribute('aria-label', expanded ? 'Restore project viewer size' : 'Expand project viewer');
  bringForward(win);
}
function moveWindow(win: HTMLElement, x: number, y: number) {
  if (!workspace || !desktopMode.matches || win.classList.contains('is-maximized')) return;
  const root = workspace.getBoundingClientRect();
  const bounds = win.getBoundingClientRect();
  const previous = positions.get(win) || { x: 0, y: 0 };
  const originX = bounds.left - root.left - previous.x;
  const originY = bounds.top - root.top - previous.y;
  const next = { x: Math.max(8-originX,Math.min(x,root.width-bounds.width-8-originX)), y: Math.max(38-originY,Math.min(y,root.height-bounds.height-40-originY)) };
  positions.set(win,next);
  win.style.transform = `translate(${next.x}px, ${next.y}px)`;
}
if (workspace) {
  workspace.querySelectorAll<HTMLElement>('[data-window]').forEach(win => {
    win.addEventListener('pointerdown',()=>bringForward(win));
    const handle = win.querySelector<HTMLElement>('[data-drag-handle]')!;
    handle.addEventListener('pointerdown',event=>{
      if (!desktopMode.matches || event.button !== 0 || (event.target as HTMLElement).closest('button') || win.classList.contains('is-maximized')) return;
      event.preventDefault();
      const start = { x:event.clientX, y:event.clientY };
      const origin = positions.get(win) || {x:0,y:0};
      handle.setPointerCapture(event.pointerId);
      win.classList.add('is-dragging');
      const move = (current:PointerEvent)=>moveWindow(win,origin.x+current.clientX-start.x,origin.y+current.clientY-start.y);
      const finish = ()=>{ win.classList.remove('is-dragging');handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',finish);handle.removeEventListener('pointercancel',finish); };
      handle.addEventListener('pointermove',move);handle.addEventListener('pointerup',finish);handle.addEventListener('pointercancel',finish);
    });
    handle.addEventListener('keydown',event=>{
      const delta = event.shiftKey ? 40 : 10;
      const directions: Record<string,[number,number]> = {ArrowLeft:[-delta,0],ArrowRight:[delta,0],ArrowUp:[0,-delta],ArrowDown:[0,delta]};
      if (event.target !== handle || !desktopMode.matches || !directions[event.key]) return;
      event.preventDefault();
      const current=positions.get(win)||{x:0,y:0};const [x,y]=directions[event.key];moveWindow(win,current.x+x,current.y+y);
    });
    handle.addEventListener('dblclick',event=>{ if (!(event.target as HTMLElement).closest('button') && win.dataset.window==='viewer') toggleMaximize(win); });
  });
  workspace.querySelectorAll<HTMLElement>('[data-open-window]').forEach(button=>button.addEventListener('click',()=>openWindow(button.dataset.openWindow!,button)));
  workspace.querySelectorAll<HTMLElement>('[data-close-window]').forEach(button=>button.addEventListener('click',()=>hideWindow(button.dataset.closeWindow!)));
  workspace.querySelectorAll<HTMLElement>('[data-minimize]').forEach(button=>button.addEventListener('click',()=>hideWindow(button.dataset.minimize!)));
  workspace.querySelectorAll<HTMLElement>('[data-maximize]').forEach(button=>button.addEventListener('click',()=>toggleMaximize(workspaceWindow(button.dataset.maximize!)!)));
  function resetWorkspace() {
    positions.clear();
    workspace?.querySelectorAll<HTMLElement>('[data-window]').forEach(win=>{win.style.transform='';if(win.classList.contains('is-maximized')) toggleMaximize(win);});
  }
  workspace.querySelector('[data-reset-workspace]')?.addEventListener('click',resetWorkspace);
  function updateWorkspaceMode() {
    resetWorkspace();
    workspace?.querySelector('[role="tablist"]')?.setAttribute('aria-orientation',compactFiles.matches?'horizontal':'vertical');
    workspace?.querySelectorAll<HTMLElement>('[data-drag-handle]').forEach(handle=>{
      if (desktopMode.matches) {handle.tabIndex=0;handle.setAttribute('aria-label',`${handle.querySelector('span')?.textContent?.trim()} window title. Use arrow keys to move.`);}
      else {handle.removeAttribute('tabindex');handle.removeAttribute('aria-label');}
    });
  }
  desktopMode.addEventListener('change',updateWorkspaceMode);
  compactFiles.addEventListener('change',updateWorkspaceMode);
  updateWorkspaceMode();
  document.addEventListener('keydown',event=>{
    if (event.key!=='Escape'||dialog?.open) return;
    const win = (document.activeElement as HTMLElement)?.closest<HTMLElement>('.floating-window');
    if (win && !win.hidden) hideWindow(win.dataset.window!);
  });
}
const lab = document.querySelector<HTMLElement>('[data-lab]');
if (lab) {
  const tabs = [...lab.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...lab.querySelectorAll<HTMLElement>('[data-panel]')];
  const transitions = new Map<HTMLElement, ReturnType<typeof animate>>();
  function select(tab: HTMLButtonElement, focus = false) {
    openWindow('viewer', undefined, false);
    const caption = lab?.querySelector('[data-window-caption]');
    if (caption) {
      caption.textContent = tab.querySelector('.file-name')?.textContent || 'Project viewer';
      if (desktopMode.matches) caption.closest('[data-drag-handle]')?.setAttribute('aria-label', `${caption.textContent} project window. Use arrow keys to move.`);
    }
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    panels.forEach(panel => {
      const active = panel.dataset.panel === tab.dataset.project;
      panel.hidden = !active;
      transitions.get(panel)?.cancel();
      transitions.delete(panel);
      if (active && !reducedMotion.matches) {
        transitions.set(panel, animate(panel, { opacity: [0, 1], transform: ['translateY(7px)', 'translateY(0)'] }, { duration: 0.28, ease: [0.2, 0.65, 0.3, 1] }));
      }
      if (!active) panel.querySelectorAll<HTMLElement>('[data-video]').forEach(stopVideo);
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next: number | undefined;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next=(index+1)%tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next=(index-1+tabs.length)%tabs.length;
      if (event.key === 'Home') next=0;
      if (event.key === 'End') next=tabs.length-1;
      if (next !== undefined) { event.preventDefault(); select(tabs[next],true); }
    });
  });
}
