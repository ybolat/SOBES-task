import React, {useRef, useState} from "react";
import {Box, Paper} from "@mui/material";
import {CameraAlt, Mic, MicOff} from "@mui/icons-material";
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import CustomButton from "@/components/button/CustomButton";

type Props = {
    mimeType: string;
}

const AudioVideoRecorder = ({mimeType}: Props) => {
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const liveVideoFeed = useRef<HTMLVideoElement | null>(null);

    const [permission, setPermission] = useState<boolean>(false);
    const [recordingStatus, setRecordingStatus] = useState<string>("inactive");
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [chunks, setChunks] = useState<Blob[]>([]);
    const [record, setRecord] = useState<string | null>(null);

    const isVideo = mimeType.includes("video");

    const getPermission = async () => {
        setRecord(null);
        if ("MediaRecorder" in window) {
            try {
                const streamData: MediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: isVideo,
                });
                setPermission(true);
                setStream(streamData);

                if (liveVideoFeed.current && isVideo) {
                    liveVideoFeed.current.srcObject = streamData;
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        if (stream) {
            mediaRecorder.current = new MediaRecorder(stream, {mimeType});
            mediaRecorder.current.start();
            let localChunks: Blob[] = [];
            mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
                if (event.data && event.data.size > 0) {
                    localChunks.push(event.data);
                }
            };
            setChunks(localChunks);
        }
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const blob = new Blob(chunks, {type: mimeType});
                const recordUrl = URL.createObjectURL(blob);
                setRecord(recordUrl);
                setChunks([]);
            };
        }
    };

    return (
        <Box>
            {!permission && (
                <CustomButton handleClick={getPermission} text={"Get Permission"}/>
            )}
            {permission && recordingStatus === "inactive" && (
                <CustomButton handleClick={startRecording} text={"Start Recording"}
                              startIcon={isVideo ? <CameraAlt/> : <Mic/>}/>
            )}
            {recordingStatus === "recording" && (
                <CustomButton handleClick={stopRecording} text={"Stop Recording"}
                              startIcon={isVideo ? <NoPhotographyOutlinedIcon/> : <MicOff/>}/>
            )}
            {isVideo ? (
                <Paper elevation={3} style={{margin: "20px", padding: "10px"}}>
                    {
                        record ? (
                            <video src={record} controls/>
                        ) : (
                            <video ref={liveVideoFeed} controls autoPlay/>
                        )
                    }
                </Paper>
            ) : record && (
                <Paper elevation={3} style={{margin: "20px", padding: "10px"}}>
                    <audio src={record} controls/>
                </Paper>
            )}
        </Box>
    );
}

export default AudioVideoRecorder;
