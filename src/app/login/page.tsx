// src/app/login/page.tsx
'use client'

import { auth } from '@/lib/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            router.push('/admin') // ログイン後に移動するページ
        } catch (err) {
            alert('ログインに失敗しました')
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1e1e] text-[#c7e1d6]">
            <h1 className="text-3xl font-bold mb-6">ログイン</h1>
            <button
                onClick={handleGoogleLogin}
                className="bg-white text-black px-6 py-3 rounded shadow hover:bg-gray-200 transition"
            >
                Googleでログイン
            </button>
        </div>
    )
}
