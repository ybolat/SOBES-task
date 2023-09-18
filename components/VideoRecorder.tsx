import React, { useRef, useState } from "react";

const mimeType: string = "video/webm";

const VideoRecorder: React.FC = () => {
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const liveVideoFeed = useRef<HTMLVideoElement | null>(null);

    const [permission, setPermission] = useState<boolean>(false);
    const [recordingStatus, setRecordingStatus] = useState<string>("inactive");
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
    const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints: MediaStreamConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints: MediaStreamConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream: MediaStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream: MediaStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );
                setPermission(true);
                // combine both audio and video streams
                const combinedStream: MediaStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                // set video stream to live feed player
                if (liveVideoFeed.current) {
                    liveVideoFeed.current.srcObject = videoStream;
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
            mediaRecorder.current = new MediaRecorder(stream, { mimeType });
            mediaRecorder.current.start();
            let localVideoChunks: Blob[] = [];
            mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
                if (event.data && event.data.size > 0) {
                    localVideoChunks.push(event.data);
                }
            };
            setVideoChunks(localVideoChunks);
        }
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const videoBlob = new Blob(videoChunks, { type: mimeType });
                const videoUrl = URL.createObjectURL(videoBlob);
                setRecordedVideo(videoUrl);
                setVideoChunks([]);
            };
        }
    };

    return (
        <div>
            <h2>Video Recorder</h2>
            <main>
                <div className="video-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Camera
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
                </div>
            </main>

            <div className="video-player">
                {!recordedVideo ? (
                    <video
                        ref={liveVideoFeed}
                        autoPlay
                        className="live-player"
                    ></video>
                ) : null}
                {recordedVideo ? (
                    <div className="recorded-player">
                        <video className="recorded" src={recordedVideo} controls></video>
                        <a download href={recordedVideo}>
                            Download Recording
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VideoRecorder;
