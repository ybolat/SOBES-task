'use client'

import {observer} from "mobx-react-lite";
import store from "@/store/QuestionsStore";
import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import {Box, Divider, Typography} from "@mui/material";
import InputAnswer from "@/components/answers/InputAnswer";
import ChooseOneAnswer from "@/components/answers/ChooseOneAnswer";
import ChooseMultipleAnswers from "@/components/answers/ChooseMultipleAnswers";
import FileAnswer from "@/components/answers/FileAnswer";
import PhotoAnswer from "@/components/answers/PhotoAnswer";

const Questions = () => {

    const {questions, questionTypes, fetchQuestions, fetchQuestionTypes} = store;

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    useEffect(() => {
        fetchQuestionTypes();
    }, [fetchQuestionTypes]);

    return (
        <Container>
            {questions.map((question) => (
                <Box key={question.id}>
                    <Typography variant="h6">{question.question}</Typography>
                    <Box mb={2}>
                        {question.type === questionTypes[0] && <InputAnswer />}
                        {question.type === questionTypes[1] && (
                            <ChooseOneAnswer possibleAnswers={question.possibleAnswers ?? []} />
                        )}
                        {question.type === questionTypes[2] && (
                            <ChooseMultipleAnswers possibleAnswers={question.possibleAnswers ?? []} />
                        )}
                        {question.type === questionTypes[3] && (
                            <FileAnswer accept={"audio/*"} />
                        )}
                        {question.type === questionTypes[4] && (
                            <FileAnswer accept={"video/*"} />
                        )}
                        {question.type === questionTypes[5] && <PhotoAnswer />}
                    </Box>
                    <Divider />
                </Box>
            ))}
        </Container>
    );
}

export default observer(Questions);
