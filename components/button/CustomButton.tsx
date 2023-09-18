import {Button} from "@mui/material";
import React, { ButtonHTMLAttributes } from "react";

type Props = {
    text: string;
    handleClick?: () => void;
    startIcon?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton = ({text, handleClick, startIcon, children}: Props) => (
    <Button variant="contained" component="label" color="primary" onClick={handleClick} startIcon={startIcon}>
        {text}
        {children}
    </Button>
)

export default CustomButton;
