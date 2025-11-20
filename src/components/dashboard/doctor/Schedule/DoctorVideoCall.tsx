/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function DoctorVideoCall({
  roomId,
  doctorId,
}: {
  roomId: string;
  doctorId: string;
}) {
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);

  const [client, setClient] = useState<any>(null);
  const [AgoraRTC, setAgoraRTC] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const [localTracks, setLocalTracks] = useState<any[]>([]);

  // Load Agora SDK safely (no SSR issue in Vite)
  useEffect(() => {
    const loadAgora = async () => {
      const Agora = (await import("agora-rtc-sdk-ng")).default;

      const agoraClient = Agora.createClient({
        mode: "rtc",
        codec: "vp8",
      });

      // Handle remote video/audio
      agoraClient.on("user-published", async (user: any, mediaType: any) => {
        await agoraClient.subscribe(user, mediaType);

        if (mediaType === "video" && remoteVideoRef.current) {
          user.videoTrack.play(remoteVideoRef.current);
        }

        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      setClient(agoraClient);
      setAgoraRTC(Agora);
    };

    loadAgora();
  }, []);

  const joinCall = async () => {
    if (!client || !AgoraRTC) return;

    const res = await axios.post(
      "https://server.eyelineoptica.com/api/v1/agora/create-token",
      {
        channelName: roomId,
        uid: doctorId,
        role: "publisher", // Doctor publishes video
      }
    );

    const { token, appId } = res.data.data;

    await client.join(appId, roomId, token, doctorId);

    

    const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalTracks(tracks);

    // Local doctor video
    if (localVideoRef.current) {
      tracks[1].play(localVideoRef.current);
    }

    await client.publish(tracks);

    setJoined(true);
  };

  const leaveCall = async () => {
    if (localTracks.length > 0) {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });
      setLocalTracks([]);
    }

    if (client) await client.leave();

    if (localVideoRef.current) localVideoRef.current.innerHTML = "";
    if (remoteVideoRef.current) remoteVideoRef.current.innerHTML = "";

    setJoined(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-10 mt-5 px-4 text-white rounded-md">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-wide">
        Doctor Video Consultation
      </h1>

      {/* VIDEO AREA */}
      <div className="w-full max-w-4xl relative">
        {/* REMOTE VIDEO (BIG SCREEN) */}
        <div
          ref={remoteVideoRef}
          className="w-full h-[60vh] bg-black rounded-xl shadow-lg"
        ></div>

        {/* LOCAL VIDEO (DOCTOR SMALL WINDOW) */}
        <div
          ref={localVideoRef}
          className="w-40 h-28 bg-black absolute bottom-4 right-4 border border-gray-600 rounded-lg shadow-md"
        ></div>
      </div>

      {/* CONTROLS */}
      <div className="mt-8 flex gap-4">
        {!joined ? (
          <button
            onClick={joinCall}
            className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={leaveCall}
            className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            End Call
          </button>
        )}
      </div>

      <p className="mt-4 text-sm opacity-80">
        {joined ? "Connected to patient" : "Click Start Call to begin"}
      </p>
    </div>
  );
}
