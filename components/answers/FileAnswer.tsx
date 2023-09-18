import React, {ChangeEvent, useEffect, useId, useState} from "react";
import {Typography} from "@mui/material";
import CustomButton from "@/components/button/CustomButton";
import CustomFileInput from "@/components/input/CustomFileInput";

type Props = {
    accept: string;
}

const FileAnswer = ({accept}: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const id = useId();

    useEffect(() => {
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setFileUrl(objectURL);
        }
    }, [file]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            setFileUrl(null);
            setFile(files[0]);
        }
    };

    return <>
        <CustomFileInput id={id} handleEvent={handleFileChange} accept={accept}/>
        <label htmlFor={id}>
            <CustomButton text={"Choose file"}/>
        </label>
        {file && <Typography>Выбранный файл: {file.name}</Typography>}
        {
            file?.type.includes("audio") && fileUrl && (
                <audio controls>
                    <source src={fileUrl} type={file.type}/>
                </audio>
            )
        }
        {
            file?.type.includes("video") && fileUrl && (
                <video controls width={500}>
                    <source src={fileUrl} type={file.type}/>
                </video>
            )
        }
    </>

}

export default FileAnswer;
