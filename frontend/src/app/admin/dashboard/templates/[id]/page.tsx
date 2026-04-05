import TemplateForm from "@/components/TemplateForm"
import { Template } from "@/lib/types"
import {getTemplates} from "@/utils/templateControllers"

import styles from "./styles.module.css"

interface TemplatePageProps {
    params: Promise<{id: string}>
}

export default async function TemplatePage({ params }: TemplatePageProps) {
    const { id } = await params

    const template:Template = await getTemplates(Number(id))
    return (
        <section className={styles.container}>
            <h1>Editar plantilla</h1>
            <TemplateForm type="edit" template={template} />
        </section>
    )
}