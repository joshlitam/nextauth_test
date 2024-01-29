import React from 'react'
import styles from "./admin.module.css"
import AdminUsers from '@/components/admin/adminUsers/adminUsers';
import AdminUserForm from '@/components/admin/adminUserForm/AdminUserForm';



const page = () => {

    return (
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.row}>
                    <h1 className={styles.title}>Users</h1>
                    <AdminUsers />
                </div>
                <div className={styles.row}>
                    <h1 className={styles.title}>Register</h1>
                    <AdminUserForm />
                </div>
            </div>
            <div className={styles.col}>
                <div className={styles.row}>
                    <h1 className={styles.title}>Posts</h1>
                    <AdminUsers />
                </div>
                <div className={styles.row}>
                    <h1 className={styles.title}>Create Post</h1>
                    <AdminUserForm />
                </div>
            </div>

        </div>
    )
}

export default page
