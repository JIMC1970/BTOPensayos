import TemplateForm from "@/components/TemplateForm";

import styles from "./styles.module.css"

export default function CreateTemplatePage() {
    return (
        <section className={styles.container}>
            <h1>Crear plantilla</h1>
            <TemplateForm type="create"/>
        </section>
    )
}