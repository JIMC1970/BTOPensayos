'use client'

import { useAppContext } from "@/context/AppContext";
import styles from "./styles.module.css"


import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function LoginForm() {
    const params = useSearchParams();
    const router = useRouter();
    const {setUser} = useAppContext();

    const redirectTo = params.get("redirect") || "/home";

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget
        const formData = new FormData(form)

        const email = formData.get('email')
        const password = formData.get('password')

        const {data: user} = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login`, {email, password}, {withCredentials: true})
        setUser(user)
        
        router.replace(redirectTo)
    }

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <label htmlFor="email">
                <p>Correo electrónico</p>
                <input required type="email" placeholder="Ej: nombre@email.com" name="email" id="email"/>
            </label>
            <label htmlFor="password">
                <p>Contraseña</p>
                <input required type="password" placeholder="Ej: 12345678*ABC" name="password" id="password"/>
            </label>
            <button className={styles.button} type="submit">Iniciar sesión</button>
        </form>
    )
}