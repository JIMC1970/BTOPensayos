import Link from "next/link"
import styles from "./styles.module.css"

export default function UnauthorizedPage() {
    return (
        <main className={styles.unauth}>
            <h1>Oops parece que no tienes permisos para acceder a esta página</h1>
            <Link className={styles.button} href={"/home"}>Volver al inicio</Link>
        </main>
    )
}