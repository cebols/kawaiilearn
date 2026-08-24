/**
 * Service Worker do KawaiiLearn — cuida das notificações do PWA.
 * (o app é local-first, sem cache de assets aqui para simplificar deploy.)
 */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ─── IndexedDB helpers (raw API — sem Dexie no SW) ───

function idbGetKV(key) {
  return new Promise((resolve) => {
    const req = indexedDB.open("kawaiilearn");
    req.onsuccess = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("kv")) { db.close(); return resolve(null); }
      const tx = db.transaction("kv", "readonly");
      const get = tx.objectStore("kv").get(key);
      get.onsuccess = () => { db.close(); resolve(get.result?.value ?? null); };
      get.onerror = () => { db.close(); resolve(null); };
    };
    req.onerror = () => resolve(null);
  });
}

function idbSetKV(key, value) {
  return new Promise((resolve) => {
    const req = indexedDB.open("kawaiilearn");
    req.onsuccess = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("kv")) { db.close(); return resolve(); }
      const tx = db.transaction("kv", "readwrite");
      tx.objectStore("kv").put({ key, value });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); resolve(); };
    };
    req.onerror = () => resolve();
  });
}

// ─── Periodic Background Sync — dispara nudges sem a aba aberta ───
// Funciona no Chrome 80+ quando o app está instalado como PWA.
// Em outros browsers é ignorado graciosamente (sem periodicSync no SW).

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "nudge-check") {
    event.waitUntil(checkAndFireNudges());
  }
});

async function checkAndFireNudges() {
  const enabled = await idbGetKV("nudgesEnabled");
  if (enabled !== "1") return;

  const raw = await idbGetKV("nudgePlan");
  if (!raw) return;

  const plan = JSON.parse(raw);
  const todayStr = new Date().toDateString();
  if (plan.date !== todayStr) return;

  const now = Date.now();
  const h = new Date().getHours();
  if (h < 7 || h >= 22) return; // quiet hours

  const rawSent = await idbGetKV("nudgeSent");
  const sent = rawSent ? JSON.parse(rawSent) : { date: todayStr, templateIdxs: [] };
  const sentToday = sent.date === todayStr ? [...sent.templateIdxs] : [];

  for (const item of plan.items) {
    if (item.at > now) continue; // ainda não é hora
    if (sentToday.includes(item.templateIdx)) continue; // já mandou hoje

    await self.registration.showNotification(item.title, {
      body: item.body,
      tag: item.tag || `kawaii-${item.templateIdx}`,
      icon: "/kawaiilearn/icon-192.png",
      badge: "/kawaiilearn/icon-192.png",
      data: { url: `/kawaiilearn/?dialogue=${encodeURIComponent(item.dialogueId)}` },
      renotify: false,
    });

    sentToday.push(item.templateIdx);
    await idbSetKV("nudgeSent", JSON.stringify({ date: todayStr, templateIdxs: sentToday }));

    // atualiza cooldown
    const rawCooldown = await idbGetKV("nudgeCooldown");
    const cooldown = rawCooldown ? JSON.parse(rawCooldown) : {};
    const d = new Date();
    cooldown[item.templateIdx] = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    await idbSetKV("nudgeCooldown", JSON.stringify(cooldown));
  }
}

// ─── Clique numa notificação: abre o app na URL alvo (deep link ao diálogo) ───

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  if (!url) return;
  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of all) {
        if (client.url.includes("/kawaiilearn/") && "focus" in client) {
          await client.focus();
          if ("navigate" in client) return client.navigate(url);
          return;
        }
      }
      if (self.clients.openWindow) await self.clients.openWindow(url);
    })()
  );
});

// ─── postMessage do app: mostra uma notificação imediata ───

self.addEventListener("message", (event) => {
  const { type, title, body, tag, url, icon } = event.data || {};
  if (type !== "notify") return;
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag: tag || "kawaii-nudge",
      icon: icon || "/kawaiilearn/icon-192.png",
      badge: "/kawaiilearn/icon-192.png",
      data: { url },
      renotify: false,
    })
  );
});
