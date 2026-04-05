"use client";

import { User } from "@/lib/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./styles.module.css"

export default function ProfileData () {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/profile`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data)
            })
            .catch(() => (window.location.href = "/login"))
    }, [])
    if (!user) return <div>Cargando...</div>
    return (
        <section>
            <div>Bienvenido {user.email}</div>
            {user.role === "admin" && <Link className={styles.button} href="/admin/dashboard">Ir al dashboard</Link>}
        </section>
    )
}