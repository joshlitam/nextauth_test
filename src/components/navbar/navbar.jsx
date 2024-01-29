import React from 'react'
import styles from './Navbar.module.css'
import Links from './links/links'
import { auth } from '@/lib/auth';

const Navbar = async () => {
    const session = await auth();
    return (
        <div className={styles.container}>
            <Links session={session} />
        </div>
    )
}

export default Navbar
