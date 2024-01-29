"use client"

import React from 'react'
import styles from './adminUserForm.module.css'
import { addUser } from '@/lib/action'
import { useFormState } from "react-dom"

const AdminUserForm = () => {
    
    const [state, formAction] = useFormState(addUser, undefined)

    return (
        <form className={styles.container} action={formAction}>
            <input className={styles.detail} type="text" placeholder="username" name="username" />
            <input className={styles.detail} type="password" placeholder="password" name="password" />
            <input className={styles.detail} type="password" placeholder="repeat password" name="repeatPassword" />
            <input className={styles.detail} type="text" placeholder="email" name="email" />
            <button>Register</button>
            {state && <span className={styles.error}>{state.error}</span>}
        </form>

    )
}

export default AdminUserForm
