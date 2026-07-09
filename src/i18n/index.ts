import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptBR from "./pt-BR.json";
import enUS from "./en-US.json";
import jaJP from "./ja-JP.json";

i18n.use(initReactI18next).init({
  resources: {
    "pt-BR": { translation: ptBR },
    "en-US": { translation: enUS },
    "ja-JP": { translation: jaJP },
  },
  lng: localStorage.getItem("kl-lang") ?? "pt-BR",
  fallbackLng: "pt-BR",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => localStorage.setItem("kl-lang", lng));

export default i18n;
