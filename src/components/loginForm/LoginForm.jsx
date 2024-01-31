'use client'

import React from 'react'
import styles from './loginForm.module.css'
import { useFormState } from "react-dom"
import { login } from '@/lib/action'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const [state, formAction] = useFormState(login, undefined)

    const router = useRouter();
    // useEffect(() => {
    //     state?.success && router.push("/");
    // }, [state?.success, router])


    return (
        <form className={styles.form} action={formAction}>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
            {state && <span className={styles.error}>{state.error}</span>}
        </form>
    )
}

export default LoginForm
