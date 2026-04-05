"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "./page.module.css"

export default function Register() {
    const router = useRouter();
    
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget
        const formData = new FormData(form)

        const email = formData.get('email') 
        const password = formData.get('password') 

        await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/register` || '', {email, password}, {withCredentials: true})
        router.push("/profile")
    }

    return (
        <main>
            <section className={styles.register}>
                <div className={styles.container}>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">
                            <p>Correo electrónico</p>
                            <input required type="email" placeholder="Ej: nombre@email.com" name="email" id="email"/>
                        </label>
                        <label htmlFor="password">
                            <p>Contraseña</p>
                            <input required type="password" placeholder="Ej: 12345678*ABC" name="password" id="password"/>
                        </label>
                        <button className={styles.button} type="submit">Registrarse</button>
                    </form>
                    <p>Ya tienes cuenta <Link href="/login">Inicia sesión</Link></p>
                </div>
            </section>
        </main>
    )
}