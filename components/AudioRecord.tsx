import React, {useRef, useState} from 'react';

const mimeType: string = "audio/webm";

const AudioRecord: React.FC = () => {
    const mediaRecorder = useRef<MediaRecorder | null>(null);

    const [permission, setPermission] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordingStatus, setRecordingStatus] = useState<string>("inactive");
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audio, setAudio] = useState<string | null>(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData: MediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
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
            mediaRecorder.current = new MediaRecorder(stream, {mimeType: mimeType});
            let localAudioChunks: Blob[] = [];
            mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
                if (event.data && event.data.size > 0) {
                    localAudioChunks.push(event.data);
                }
            };
            setAudioChunks(localAudioChunks);
            mediaRecorder.current.start();
        }
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: mimeType });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);
                setAudioChunks([]);
            };
        }
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
