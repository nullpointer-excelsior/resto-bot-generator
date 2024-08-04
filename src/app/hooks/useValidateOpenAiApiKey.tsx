import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { getUserStorage } from '../../lib/localstorage'

export default function useValidateOpenAiApiKey() {
    const router = useRouter()
    useEffect(() => {
        const storage = getUserStorage()
        if (!storage?.openaiApiKey) {
            router.push("/")
        }
    }, [])
}
