import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  enableNotifications,
  fireSample,
  isEnabled,
  notificationsSupported,
  permissionState,
} from "../lib/notifications";

/**
 * Card do dashboard para ativar/testar as notificações espontâneas dos personagens.
 * Só mostra estado; a mecânica toda mora em lib/notifications.
 */
export default function NotificationsCard() {
  const { t } = useTranslation();
  const [state, setState] = useState<NotificationPermission | "unsupported">("default");
  const [enabled, setEnabled] = useState(false);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    setState(permissionState());
    void isEnabled().then(setEnabled);
  }, []);

  if (!notificationsSupported()) return null;

  const ask = async () => {
    setAsking(true);
    const res = await enableNotifications();
    setState(res);
    setEnabled(res === "granted");
    setAsking(false);
  };

  if (enabled) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔔</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-stone-700">{t("notif.onTitle")}</h3>
            <p className="mt-1 text-xs text-stone-500">{t("notif.onSub")}</p>
          </div>
        </div>
        <button
          onClick={() => void fireSample()}
          className="mt-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-200"
        >
          🎁 {t("notif.sample")}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-sakura-50 to-violet-50 p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🔔</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-stone-700">{t("notif.title")}</h3>
          <p className="mt-1 text-xs text-stone-500">{t("notif.sub")}</p>
        </div>
      </div>
      <ul className="mt-3 space-y-1 text-[11px] text-stone-500">
        <li>💡 {t("notif.rule1")}</li>
        <li>🌙 {t("notif.rule2")}</li>
        <li>🎭 {t("notif.rule3")}</li>
      </ul>
      {state === "denied" ? (
        <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-xs text-rose-700">
          ⚠️ {t("notif.denied")}
        </p>
      ) : (
        <button
          disabled={asking}
          onClick={ask}
          className="mt-4 w-full rounded-full bg-sakura-500 py-2.5 font-semibold text-white transition enabled:hover:bg-sakura-600 disabled:opacity-60"
        >
          🔔 {t("notif.enable")}
        </button>
      )}
    </div>
  );
}
