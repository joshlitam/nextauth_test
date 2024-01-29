'use client'

import Link from 'next/link'
import React from 'react'
import styles from './links.module.css'
import { usePathname } from 'next/navigation'
import { handleLogout } from '@/lib/action'

const links = [
  { path: "About", href: "/about" },
  { path: "Portfolio", href: "/portfolio" },
  { path: "Contact", href: "/contact" },
]

const Links = ({ session }) => {
  const pathName = usePathname();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>BIG JOE INC</Link>
      <div className={styles.links}>
        {links.map(link => (
          <Link className={`${styles.link} ${pathName === link.href && styles.login}`} href={link.href} key={link.href}>{link.path}</Link>
        ))}
        {session ? (
          <>
            {session.user?.isAdmin && <NavLinks item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : <Link href="/login">Login</Link>}
      </div>

    </div>
  )
}

export default Links
