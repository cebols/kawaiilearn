/**
 * Service Worker do KawaiiLearn — só cuida das notificações do PWA.
 * (o app é local-first, sem cache de assets aqui para simplificar deploy.)
 */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

/** Clique numa notificação: abre o app na URL alvo (deep link ao diálogo). */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url;
  if (!url) return;
  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      // se a aba já estiver aberta, foca e navega
      for (const client of all) {
        if (client.url.includes("/kawaiilearn/") && "focus" in client) {
          await client.focus();
          if ("navigate" in client) return client.navigate(url);
          return;
        }
      }
      // senão, abre uma nova
      if (self.clients.openWindow) await self.clients.openWindow(url);
    })()
  );
});

/** Mensagem do app pra pedir uma notificação. O app fala com o SW por postMessage. */
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
      // renotify: false ⇒ atualizar a mesma tag não vibra de novo
      renotify: false,
    })
  );
});
