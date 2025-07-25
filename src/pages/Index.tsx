import { useState } from "react";
import VideoConference from '@/components/VideoConference';
import { RoomSetup } from "@/components/RoomSetup";

const Index = () => {
  const [roomConfig, setRoomConfig] = useState<{
    userName: string;
    cameraEnabled: boolean;
    micEnabled: boolean;
    roomName: string;
  } | null>(null);

  const handleJoinRoom = (config: {
    userName: string;
    cameraEnabled: boolean;
    micEnabled: boolean;
    roomName: string;
  }) => {
    setRoomConfig(config);
  };

  if (!roomConfig) {
    return <RoomSetup onJoinRoom={handleJoinRoom} />;
  }

  return <VideoConference {...roomConfig} />;
};

export default Index;
