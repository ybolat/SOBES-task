import {Input} from "@mui/material";
import React, {ChangeEvent} from "react";

type Props = {
    handleEvent: (e: ChangeEvent<HTMLInputElement>) => void;
    accept: string;
    id: string;
}

const CustomFileInput = ({handleEvent, accept, id}: Props) => {
    return <Input
        id={id}
        type="file"
        onChange={handleEvent}
        style={{display: "none"}}
        inputProps={{accept: accept}}
    />
}

export default CustomFileInput;
