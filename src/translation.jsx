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
          create_post: {
            elevators: 'Elevators',
            toilets: 'Toilets',
            sliding_revolving_doors: 'Sliding/revolving doors',
            escalators: 'Escalators',
            displays: 'Displays',
            others: 'Others',
            create_malfunction_info: 'Create malfunction info',
            category: 'Category',
            text: 'Text',
            create: 'Create',
            chooseimage: 'Choose image',
            createdsuccess: 'Created successfully',
            please_select_category: 'Please select a category',
            please_describe_the_issue: 'Please describe the issue'
          },
          user_post: {
            loading: 'Loading',
            posted: 'posted:',
            no_posts_found: 'No malfunction info',
          },
          login: {
            login:'Login',
            email: 'Email address',
            password: 'Password',
            no_existing_account: `Don't have an account? Sign Up`,
          },
          navbar: {
            greeting: 'Hello',
            logout: 'Log out',
            login:'Login',
            signup: 'Signup',
            myaccount: 'My account',
            dashboard: 'My dashboard'
          },
          signup: {
            signup: 'Signup',
            email: 'Email address',
            password: 'Password',
            username: 'Username',
            city: 'City',
            existing_account: 'Already have an account? Log in',
          },
          myaccount: {
            profile: 'profile',
            changeavatar: 'Change avatar',
            chooseavatar: 'Choose picture',
            upload: 'Upload',
            uploadsuccess: 'Upload successfully',
          }
        }
      },
      de: {
        translation: {
          create_post: {
            elevators: 'Fahrstühle',
            toilets: 'Toiletten',
            sliding_revolving_doors: 'Dreh-/Schiebetüren',
            escalators: 'Rolltreppen',
            displays: 'Anzeigen',
            others: 'Sonstige',
            create_malfunction_info: 'Störungsmeldung erstellen',
            category: 'Kategorie',
            text: 'Text',
            create: 'Erstellen',
            chooseimage: 'Bild auswählen',
            createdsuccess: 'Erfolgreich erstellt',
            please_select_category: 'Bitte wählen Sie eine Kategorie',
            please_describe_the_issue: 'Bitte beschreiben Sie die Störungsmeldung',
          },
          user_post: {
            loading: 'Lädt',
            posted: 'gepostet:',
            no_posts_found: 'Keine Störungsmeldungen',
          },
          login: {
            login:'Anmelden',
            email: 'E-Mail',
            password: 'Passwort',
            no_existing_account: `Haben Sie keinen Account? Registrieren`,
          },
          navbar: {
            greeting: 'Hallo',
            logout: 'Ausloggen',
            login:'Anmelden',
            signup: 'Registrieren',
            myaccount: 'Mein Profil',
            dashboard: 'Mein Dashboard',
          },
          signup: {
            signup: 'Registrieren',
            email: 'E-Mail',
            password: 'Passwort',
            username: 'Nutzername',
            city: 'Stadt',
            existing_account: 'Haben Sie bereits einen Account? Anmelden',
          },
          myaccount: {
            profile: 'Profil',
            changeavatar: 'Avatar ändern',
            chooseavatar: 'Bild auswählen',
            upload: 'Hochladen',
            uploadsuccess: 'Das Bild wurde hochgeladen',
          }
        }
      }
    }
  })
