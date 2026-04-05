import { Template } from "@/lib/types";
import {getTemplates} from "@/utils/templateControllers"
import Link from "next/link";

import styles from "./styles.module.css"
import DeleteButton from "../DeleteButton";

export default async function TemplateListing() {
    const templates:Template[] = await getTemplates(); 
    
    return (
        <div className={styles.listing}>
            <ul>
                <li className={styles.content}>
                    <b>Nombre</b>
                    <b>Etiqueta</b>
                    <b>Estado</b>
                    <b>Fecha</b>
                </li>
                {
                    templates.map((template)=>(
                        <li className={styles.template} key={template.id}>
                            <div className={styles.content}>
                                <Link href={`templates/${template.id}`}>{template.title}</Link>
                                <p>{template.tag && template.tag !== "" ? template.tag : "Ninguna"}</p>
                                <p>{template.published ? "Publicado" : "Borrador"}</p>
                                <p>{template.createdAt}</p>
                                <DeleteButton id={template.id} />
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}