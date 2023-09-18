import React, {useRef, useState} from "react";
import {Box} from "@mui/material";
import {CameraAlt, Mic, MicOff} from "@mui/icons-material";
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import CustomButton from "@/components/button/CustomButton";
import CustomPaper from "@/components/paper/CustomPaper";

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
                <>
                    {record ? (
                        <CustomPaper>
                            <video src={record} controls/>
                        </CustomPaper>
                    ) : liveVideoFeed && (
                        <CustomPaper>
                            <video ref={liveVideoFeed} controls autoPlay/>
                        </CustomPaper>
                    )}
                </>
            ) : record && (
                <CustomPaper>
                    <audio src={record} controls/>
                </CustomPaper>
            )}
        </Box>
    );
}

export default AudioVideoRecorder;
