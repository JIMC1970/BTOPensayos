import Link from "next/link";
import { ReactNode } from "react";
import styles from "./page.module.css"

export default function DashboardLayout({children}: {children: ReactNode}) {
    return (
        <>
            <nav className={styles.navigation}>
                <ul>
                    <li><Link href="/admin/dashboard/templates">Gestionar plantillas</Link></li>
                    <li><Link href="/admin/dashboard/voices">Gestionar voces</Link></li>
                </ul>
            </nav>
            <main className={styles.dashboard}>
                {children}
            </main>
        </>
    )
}