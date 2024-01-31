import { auth, signIn } from '@/lib/auth'
import React from 'react'
import styles from './login.module.css'
import LoginForm from '@/components/loginForm/LoginForm';
import Link from 'next/link';

const page = async () => {

  const session = await auth();

  const handleGithubLogin = async () => {
    "use server"
    await signIn("github");
  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Sign In</h1>
        <LoginForm />
        <form className={styles.login} action={handleGithubLogin}>
          <button>Login with Github</button>
        </form>
        <span>{`Don't have an account? `}<Link href="/register" className={styles.register}>Register here</Link></span>
      </div>

    </div>
  )
}

export default page
