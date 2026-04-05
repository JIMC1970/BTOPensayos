import Link from "next/link";

import styles from "../templates/page.module.css"
import VoicesListing from "@/components/VoicesListing";

export default function VoicesPage() {
    return (
        <section className={styles.templates}>
            <div className={styles.header}>
                <h1>Voces</h1>
            </div>
            <VoicesListing />
        </section>
    )
}