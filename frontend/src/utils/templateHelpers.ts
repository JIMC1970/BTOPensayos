import { Question, Template } from "@/lib/types";

export function questionMapping(questions:Question[], lenght:number = 5){
    while (questions.length < lenght) {
        questions.push({
            text: "",
            placeholder:""
        } as Question)
    }
    return questions;
    
}

export function questionFilterForPatch(template: Template) {
    const questionsToCreate:Question[] = []
    const questionsToUpdate:Question[] = []
    const questionsToDelete:number[] = []

    template.questions.forEach(question => {
        if (question.id && (question.text || question.placeholder)) {
            questionsToUpdate.push({
                id: question.id,
                text: question.text,
                placeholder: question.placeholder,
            } as Question)
        } else if (question.id && !question.text && !question.placeholder) {
            questionsToDelete.push(question.id)
        } else if (!question.id && question.text == "" && question.placeholder == "") {
            return
        } else {
            questionsToCreate.push(question)
        }
    });

    return {...template, questionsToCreate, questionsToDelete, questionsToUpdate}
}

export function templateFilterToCreate(template: Template) {
    const templateName = template.title.toLocaleLowerCase().replaceAll(" ", "_")
    return {...template, name: templateName}
}