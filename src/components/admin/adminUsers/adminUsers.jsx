import { getUsers } from '@/lib/data'
import Image from 'next/image'
import React from 'react'
import styles from "./adminUsers.module.css"
import { deleteUser } from '@/lib/action'

const AdminUsers = async () => {

    const users = await getUsers();

    return (
        <div className={styles.container}>
            {users.map(user => (
                <div className={styles.details} key={user.username}>
                    <div className={styles.user}>
                        <Image src={(user.img ? user.img : "/noavatar.png")} className={styles.avatar} height={50} width={50} />
                        <h1 className={styles.detail}>{user.username}</h1>
                    </div>
                    <form action={deleteUser}>
                        <input type='hidden' name="id" value={user.id}></input>
                        <button className={styles.button}>Delete</button>
                    </form>

                </div>
            ))}
        </div>
    )
}

export default AdminUsers
