import React from 'react'
import styles from "./home.module.css"
import { connectToDb } from '@/lib/utils'

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>left</div>
      <div className={styles.right}>right</div>
    </div>
  )
}

export default page