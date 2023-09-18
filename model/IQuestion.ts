import {IAnswer} from "@/model/IAnswer";

export interface IQuestion {
    id: number,
    question: string,
    type: string,
    possibleAnswers: IAnswer[] | null;
}
