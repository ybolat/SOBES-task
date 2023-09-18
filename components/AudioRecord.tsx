'use client';
import React, {useRef, useState} from 'react';

const mimeType = "audio/webm";

const AudioRecord = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const mediaRecorder = useRef<any>(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState<string | null>(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = stream && new MediaRecorder(stream, { mimeType: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks: any = [];
        mediaRecorder.current.ondataavailable = (event: any) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    return (
        <div className="audio-controls">
            {!permission ? (
                <button onClick={getMicrophonePermission} type="button">
                    Get Microphone
                </button>
            ) : null}
            {permission && recordingStatus === "inactive" ? (
                <button onClick={startRecording} type="button">
                    Start Recording
                </button>
            ) : null}
            {recordingStatus === "recording" ? (
                <button onClick={stopRecording} type="button">
                    Stop Recording
                </button>
            ) : null}
            {audio ? (
                <div className="audio-container">
                    <audio src={audio} controls></audio>
                    <a download href={audio}>
                        Download Recording
                    </a>
                </div>
            ) : null}
        </div>
    );
};

export default AudioRecord;
