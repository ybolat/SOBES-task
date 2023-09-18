import React, {ChangeEvent, useId, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import axios from "axios";
import CustomButton from "@/components/button/CustomButton";
import CustomFileInput from "@/components/input/CustomFileInput";
import Image from "next/image";

const PhotoAnswer = () => {
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const id = useId();

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setBase64Image(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const sendImageToServer = async () => {
        try {
            // CORS не настроен
            // const response =
            //     await axios
            //         .post(`https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&source=${base64Image}`);

            const serverUrl = "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5";

            const response = await axios.post(serverUrl, {source: base64Image});
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Box>
                <CustomFileInput id={id} handleEvent={handleImageUpload} accept={"image/*"}/>
                <label htmlFor={id}>
                    <CustomButton text={"Choose photo"}/>
                </label>
            </Box>
            {base64Image && (
                <Box>
                    <Typography variant="body1">Uploaded Photo:</Typography>
                    <Image src={base64Image} alt="Uploaded Photo" width={500} height={500}/>
                </Box>
            )}
            <Button
                onClick={sendImageToServer}
                variant="contained"
                color="primary"
                sx={{mt: 3}}
            >
                Send
            </Button>
        </>
    );
}

export default PhotoAnswer;
