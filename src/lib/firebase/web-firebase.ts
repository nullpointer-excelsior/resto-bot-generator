import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASURENMENT_ID,
};
const environment =  process.env.ENVIRONMENT

const app = initializeApp(firebaseConfig);

if ( environment === 'prod') {
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6LeiGiAqAAAAAAQeDs1Bi5exbUprimsJbva7-xvr'),
        isTokenAutoRefreshEnabled: true
    });
}

export const db = getFirestore(app)

