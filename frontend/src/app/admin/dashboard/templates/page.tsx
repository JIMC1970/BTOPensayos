import TemplateListing from "@/components/TemplateListing"
import styles from "./page.module.css"
import Link from "next/link"

export default function ManageShortsPage(){
    return (
        <section className={styles.templates}>
            <div className={styles.header}>
                <h1>Plantillas</h1>
                <Link className={styles.button} href="templates/create">Crear plantilla</Link>
            </div>
            <TemplateListing/>
        </section>
    )
}