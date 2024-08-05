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


export const app = initializeApp(firebaseConfig);

// const environment =  process.env.NEXT_PUBLIC_ENVIRONMENT
// console.log('Environment:', environment)
// if ( environment === 'prod') {
//     console.log('app-chek initizialized')
//     const captchaKey = process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY
//     console.log('capcha', captchaKey)
//     if (!captchaKey) {
//         throw new Error('Captcha key not defined!')
//     }
//     initializeAppCheck(app, {
//         provider: new ReCaptchaV3Provider(captchaKey),
//         isTokenAutoRefreshEnabled: true
//     });
// }

export const db = getFirestore(app)

