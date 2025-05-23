'use client';
import { useEffect } from 'react';
import { auth } from '@/lib/firebase';

export default function TestPage() {
    useEffect(() => {
        console.log('auth:', auth);
    }, []);

    return <div className="p-4 text-white">Firebase Test Page</div>;
}
