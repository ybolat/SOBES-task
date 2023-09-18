import {IQuestion} from "@/model/IQuestion";

export const questionTypes = [
    'textInput', 'oneAnswer', 'multipleAnswer', 'audio', 'video', 'photo'
]

export const questions: IQuestion[] = [
    {
        id: 1,
        question: 'Input something',
        type: questionTypes[0],
        possibleAnswers: null
    },
    {
        id: 2,
        question: 'Choose one correct answer',
        type: questionTypes[1],
        possibleAnswers: [
            {
                id: 1,
                answer: 'First answer'
            },
            {
                id: 2,
                answer: 'Second answer'
            },
            {
                id: 3,
                answer: 'Third answer'
            }
        ]
    },
    {
        id: 3,
        question: 'Choose multiple correct answers',
        type: questionTypes[2],
        possibleAnswers: [
            {
                id: 1,
                answer: 'First multiple answer'
            },
            {
                id: 2,
                answer: 'Second multiple answer'
            },
            {
                id: 3,
                answer: 'Third multiple answer'
            }
        ]
    },
    {
        id: 4,
        question: 'Upload audio',
        type: questionTypes[3],
        possibleAnswers: null
    },
    {
        id: 5,
        question: 'Upload video',
        type: questionTypes[4],
        possibleAnswers: null
    },
    {
        id: 6,
        question: 'Upload photo',
        type: questionTypes[5],
        possibleAnswers: null
    },
    {
        id: 7,
        question: 'Input something',
        type: questionTypes[0],
        possibleAnswers: null
    },
    {
        id: 8,
        question: 'Choose one correct answer',
        type: questionTypes[1],
        possibleAnswers: [
            {
                id: 1,
                answer: 'First answer'
            },
            {
                id: 2,
                answer: 'Second answer'
            },
            {
                id: 3,
                answer: 'Third answer'
            }
        ]
    },
    {
        id: 9,
        question: 'Choose multiple correct answers',
        type: questionTypes[2],
        possibleAnswers: [
            {
                id: 1,
                answer: 'First multiple answer'
            },
            {
                id: 2,
                answer: 'Second multiple answer'
            },
            {
                id: 3,
                answer: 'Third multiple answer'
            }
        ]
    },
    {
        id: 10,
        question: 'Upload audio',
        type: questionTypes[3],
        possibleAnswers: null
    },
    {
        id: 11,
        question: 'Upload video',
        type: questionTypes[4],
        possibleAnswers: null
    },
    {
        id: 12,
        question: 'Upload photo',
        type: questionTypes[5],
        possibleAnswers: null
    },
]
