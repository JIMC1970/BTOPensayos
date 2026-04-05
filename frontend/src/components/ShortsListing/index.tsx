import { Template } from "@/lib/types";
import { getShorts } from "@/utils/shortControllers";
import Link from "next/link";

export default async function ShortsListing() {
    const shorts:Template[] = await getShorts()

    if (!shorts) return <div>Cargando...</div>
    return (
        <section>
            <div>
                <ul>
                    {
                        shorts.map((short)=>(
                            <li key={`s_${short.id}`}>
                                <Link href={`/shorts/${short.id}`}>{short.title}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}