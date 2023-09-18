import React, {ChangeEventHandler, useState} from "react";
import {TextField} from "@mui/material";

const InputAnswer = () => {
    const [textInputAnswer, setTextInputAnswer] = useState('');

    const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTextInputAnswer(event.target.value);
    }

    return (
        <TextField
            type="text"
            size={"small"}
            label="Text Input Answer"
            variant="outlined"
            value={textInputAnswer}
            onChange={handleInput}
        />
    );
}

export default InputAnswer;
