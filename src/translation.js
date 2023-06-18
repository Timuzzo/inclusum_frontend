import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
.use(initReactI18next)
.use(LanguageDetector)
.init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          greeting: 'Hello',
          signup: 'Signup',
          existing_account: 'Already have an account? Log in',
          no_existing_account: `Don't have an account? Sign Up`,
          email: 'Email address',
          password: 'Password',
          username: 'Username',
          city: 'City',
          logout: 'Log out',
          login:'Login'
        }
      },
      de: {
        translation: {
          greeting: 'Hallo',
          signup: 'Registrieren',
          existing_account: 'Haben Sie bereits einen Account? Anmelden',
          no_existing_account: 'Haben Sie keinen Account? Registrieren',
          email: 'E-Mail',
          password: 'Passwort',
          username: 'Nutzername',
          city: 'Stadt',
          logout: 'Ausloggen',
          login: 'Anmelden'
        }
      },
    }
  })
