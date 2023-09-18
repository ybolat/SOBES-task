'use client';
import React, {useState} from 'react';

const RecordAudioVideo = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);

                const recorder = new MediaRecorder(streamData);
                setMediaRecorder(recorder);

                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        setAudioChunks((chunks) => [...chunks, e.data]);
                    }
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
                    console.log(audioBlob);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioUrl(audioUrl);
                };
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const playRecording = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission && !isRecording ? (
                        <button onClick={startRecording} type="button">
                            Record
                        </button>
                    ) : null}
                    {isRecording ? (
                        <button onClick={stopRecording} type="button">
                            Stop
                        </button>
                    ) : null}
                    {audioUrl ? (
                        <audio controls>
                            <source src={audioUrl} type={"audio/*"}/>
                        </audio>
                    ) : null}
                </div>
            </main>
        </div>
    );
};

export default RecordAudioVideo;
