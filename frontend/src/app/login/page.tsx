import Link from "next/link";
import styles from "./page.module.css"
import { LoginForm } from "@/components/LoginForm";
import { Suspense } from "react";

export default function Login() {
        return (
        <main>
            <section className={styles.login}>
                <div className={styles.container}>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LoginForm />
                    </Suspense>
                    <p>Aún no tienes cuenta <Link href="/register">Regístrate</Link></p>
                </div>
            </section>
        </main>
    )
}