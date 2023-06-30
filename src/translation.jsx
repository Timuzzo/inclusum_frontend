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
            city: "City",
            please_select_the_city: 'Please select the city',
            please_select_category: 'Please select a category',
            please_describe_the_issue: 'Please describe the issue',
            please_fill_in_all_fields: 'Please fill in all fields',
            post_created_successfully: 'Malfunction info was created successfully',
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
            missing_field: 'Please fill all fields.',
            incorrect_email: 'Incorrect email',
            incorrect_password: 'Incorrect password',
          },
          navbar: {
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
            existing_email: 'Email is already in use',
            missing_field: 'Please fill in all fields.',
            invalid_email: 'Wrong email format',
            strong_password: 'Make sure to use at least 8 characters, one upper case, one lower, one number and one symbol',
          },
          myaccount: {
            greeting: 'Hello',
            profile: 'profile',
            changeavatar: 'Change avatar',
            chooseavatar: 'Choose picture',
            upload: 'Upload',
            updatesuccess: 'Updated successfully',
            uploadfailure: 'Upload failed, please choose .jpg, .jpeg or .png format',
            myposts: 'My posts',
            delete: 'Delete',
            edit: 'Edit'
          },
          landingpage: {
            slogan: 'Social app to make cities more inclusive',
          },
          dashboard: {
            user_post: 'User info',
            db_post: 'DB info'
          },
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
            city: "Stadt",
            please_select_the_city: 'Bitte wählen Sie die Start aus',
            please_select_category: 'Bitte wählen Sie eine Kategorie.',
            please_describe_the_issue: 'Bitte beschreiben Sie die Störungsmeldung.',
            please_fill_in_all_fields: 'Bitte füllen Sie alle Felder aus',
            post_created_successfully: 'Störungsmeldung wurde erfolgreich erstellt',
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
            missing_field: 'Bitte füllen Sie alle Felder aus.',
            incorrect_email: 'Falsche E-Mail',
            incorrect_password: 'Falsches Passwort',
          },
          navbar: {
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
            existing_email: 'Email ist bereits registriert.',
            missing_field: 'Bitte füllen Sie alle Felder aus.',
            invalid_email: 'Falsches Email-Format',
            strong_password: 'Passwort sollte mindestens 8 Zeichen lang sein, aus einer Groß- und Kleinbuchstabe und eine Ziffer sowie einem Sonderzeichen bestehen.',
          },
          myaccount: {
            greeting: 'Hallo',
            profile: 'Profil',
            changeavatar: 'Avatar ändern',
            chooseavatar: 'Bild auswählen',
            upload: 'Hochladen',
            updatesuccess: 'Das Bild wurde aktualisiert.',
            uploadfailure: 'Hochladen fehlgeschlagen, bitte laden Sie die Datei im .jpg, .jpeg oder .png Format hoch',
            myposts: 'Meine Posts',
            delete: 'Löschen',
            edit: 'Bearbeiten'
          },
          landingpage: {
            slogan: 'Social-App für mehr Inklusion in der Stadt',
          }, 
          dashboard: {
            user_post: 'Nutzer-Meldungen',
            db_post: 'DB-Meldungen'
          },
        }
      }
    }
  })
