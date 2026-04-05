"use client"

import Link from "next/link"
import styles from "./styles.module.css"
import Image from "next/image"
import { useAppContext } from "@/context/AppContext";

export default function PageHeader() {
    const {user} = useAppContext();

    return (
        <header className={styles.header}>
          <div>
            <Link href="/home">
              <Image
              content="fill"
                width={134}
                height={41}
                alt="logo"
                src={"https://res.cloudinary.com/btopai/image/upload/btop/uploads/new_logo.png"}
              />
            </Link>
          </div>
          <div>
            <Link className={styles.access} href={user ? "/profile" : "/login"}>{user ? "Perfil" : "Acceder"}</Link>
          </div>
        </header>

    )
}