import { ShortForm, ShortFormProps } from "@/components/ShortForm";
import { Template } from "@/lib/types";
import { getShorts } from "@/utils/shortControllers";
import { getVoiceUniqueNames } from "@/utils/voiceControllers";

interface ShortPageProps {
    params: Promise<{id: string}>
}

export default async function ShortPage({ params }: ShortPageProps) {
    const { id } = await params
    const short:Template = await getShorts(Number(id))
    const nationalities:string[] = await getVoiceUniqueNames() 


    const ShortFormProps:ShortFormProps = {
        prompt: short.textprompt,
        questions: short.questions,
        voiceParams: short.voiceParams,
        nationalities: nationalities,
        emotional_state: short.emotional_state
    }
    
    if (!short) return <div>Cargando...</div>
    return (
        <main>
            <h1>{short.title}</h1>
            <h2>{short.h1}</h2>
            <h3>{short.h2}</h3>
            <h4>{short.h3}</h4>
            <p>{short.description}</p>
            <ShortForm {...ShortFormProps}/>
        </main>
    )
}