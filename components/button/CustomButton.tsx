import {Button} from "@mui/material";
import React from "react";

type Props = {
    text: string;
}

const CustomButton = ({text}: Props) => (
    <Button
        variant="outlined"
        component="span"
        color="primary"
        sx={{cursor: "pointer"}}>
        {text}
    </Button>
)

export default CustomButton;
