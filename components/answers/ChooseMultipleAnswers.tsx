import React, {ChangeEvent, useState} from "react";
import {Box, Checkbox, FormControlLabel, FormGroup} from "@mui/material";

type Props = {
    possibleAnswers: { id: number; answer: string }[];
};

const ChooseMultipleAnswers = ({possibleAnswers}: Props) => {
    const [answers, setAnswers] = useState<string[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedAnswer = event.target.value;
        if (answers.includes(selectedAnswer)) {
            setAnswers((prevState) => prevState.filter((value) => value !== selectedAnswer));
        } else {
            setAnswers((prevState) => [...prevState, selectedAnswer]);
        }
    };

    return (
        <FormGroup>
            {possibleAnswers.map((possibleAnswer) => (
                <Box key={possibleAnswer.id}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={possibleAnswer.answer}
                                checked={answers.includes(possibleAnswer.answer)}
                                onChange={handleChange}
                            />
                        }
                        label={possibleAnswer.answer}
                    />
                </Box>
            ))}
        </FormGroup>
    );
};

export default ChooseMultipleAnswers;
