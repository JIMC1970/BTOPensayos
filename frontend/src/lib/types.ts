export type User =  {
    id: number,
    email: string,
    role: string,
}

export type UserToken = User & {
    iat: number,
    exp: number,
}

export type Voice = {
    id: number,
    name: string,
    value: string,
    gender: "MALE" | "FEMALE",
    preview: string | null
}

export type VoiceParams = {
    speed:   number
    pitch: number  
    bitrate: number    
    emotion: "good" | "evil" | "neutral"  
    pause_sentence: number     
    pause_paragraph: number     
}

export type Question = {
    id: number,
    templateId: number,
    text: string,
    placeholder: string
}

export type Template = {
    id: number,
    title: string,
    name: string,
    h1: string | null,
    h2: string | null,
    h3: string | null,
    description: string | null,
    textprompt: string,
    voiceParams: VoiceParams,
    published: boolean,
    tag: string,
    popularity: number,
    promo: boolean,
    createdAt: string,
    questions: Question[],
    plural: boolean,
    emotional_state: string,
}

export type CloudFile = {
    name: string,
    resourceType: string,
    url: string
}