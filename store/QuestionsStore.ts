import {makeAutoObservable, runInAction} from "mobx";
import {IQuestion} from "@/model/IQuestion";
import axios from "axios";

class QuestionsStore {
    questionTypes: string[] = []

    questions: IQuestion[] = []

    constructor() {
        makeAutoObservable(this);
    }

    fetchQuestionTypes = async () => {
        try {
            const {data} = await axios.get<string[]>("/api/question-types");
            runInAction(() => this.questionTypes = data);
        } catch (e) {
            console.log(e);
        }
    }

    fetchQuestions = async () => {
        try {
            const {data} = await axios.get<IQuestion[]>("/api/question");
            runInAction(() => this.questions = data);
        } catch (e) {
            console.log(e);
        }
    }

}

const store = new QuestionsStore();

export default store;
