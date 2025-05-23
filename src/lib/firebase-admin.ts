// ✅ src/lib/firebase-admin.ts

import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const app = getApps().length > 0 ? getApp() : initializeApp({ credential: cert(serviceAccount as any) });

const adminDb = getFirestore(app);

export { adminDb };
