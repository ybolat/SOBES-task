import React, {ChangeEventHandler, useState} from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {IAnswer} from "@/model/IAnswer";

type Props = {
    possibleAnswers: IAnswer[];
};

const ChooseOneAnswer = ({possibleAnswers}: Props) => {
    const [answer, setAnswer] = useState("");

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setAnswer(event.target.value);
    };

    return (
        <FormControl>
            <RadioGroup name="chooseOne" value={answer} onChange={handleChange}>
                {possibleAnswers.map((possibleAnswer) => (
                    <FormControlLabel
                        key={possibleAnswer.id}
                        value={possibleAnswer.answer}
                        control={<Radio/>}
                        label={possibleAnswer.answer}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default ChooseOneAnswer;
