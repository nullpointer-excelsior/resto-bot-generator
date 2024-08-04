import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getUserStorage } from '../../lib/localstorage'

export default function useValidateOpenAiApiKey() {
    const router = useRouter()
    useEffect(() => {
        try {
            const storage = getUserStorage()
            if (!storage.openaiApiKey) {
                router.push("/")
            }
        } catch (error: any) {
            router.push("/")
        }
    }, [])
}
