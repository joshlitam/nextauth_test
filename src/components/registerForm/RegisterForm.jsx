'use client'

import React, { useEffect } from 'react'
import styles from './registerForm.module.css'
import { useFormState } from "react-dom"
import { register } from '@/lib/action'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RegisterForm = () => {

    const [state, formAction] = useFormState(register, undefined)

    const router = useRouter();
    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router])

    return (
        <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder='Username' />
            <input type="text" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <input type="password" name="repeatPassword" placeholder='Repeat Password' />
            <button>Register</button>
            {state && <span className={styles.error}>{state.error}</span>}
            <Link href="/login">Have an acount? <b>Login</b></Link>
        </form>
    )
}

export default RegisterForm
