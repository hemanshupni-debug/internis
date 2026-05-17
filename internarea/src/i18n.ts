import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Admin Login",
        username: "Username",
        password: "Password",
        signin: "Sign In",
        enterUsername: "Enter your username",
        enterPassword: "Enter your password",
      },
    },

    hi: {
      translation: {
        welcome: "स्वागत है",
        login: "एडमिन लॉगिन",
        username: "यूज़रनेम",
        password: "पासवर्ड",
        signin: "लॉगिन करें",
        enterUsername: "अपना यूज़रनेम दर्ज करें",
        enterPassword: "अपना पासवर्ड दर्ज करें",
      },
    },
  },

  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;