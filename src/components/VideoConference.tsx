import { useState } from 'react';

interface VideoConferenceProps {
  userName: string;
  cameraEnabled: boolean;
  micEnabled: boolean;
  roomName: string;
}
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff,
  MessageSquare,
  Users,
  Monitor,
  Settings,
  MoreVertical,
  Send,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSpeaking: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

const VideoConference: React.FC<VideoConferenceProps> = ({ userName, cameraEnabled, micEnabled, roomName }) => {
  const [isVideoOn, setIsVideoOn] = useState(cameraEnabled);
  const [isAudioOn, setIsAudioOn] = useState(micEnabled);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInCall, setIsInCall] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Mock participants data
  const [participants] = useState<Participant[]>([
    { id: '1', name: userName, isVideoOn: cameraEnabled, isAudioOn: micEnabled, isSpeaking: false },
    { id: '2', name: 'Alice Johnson', isVideoOn: true, isAudioOn: true, isSpeaking: true },
    { id: '3', name: 'Bob Smith', isVideoOn: false, isAudioOn: true, isSpeaking: false },
    { id: '4', name: 'Carol Davis', isVideoOn: true, isAudioOn: false, isSpeaking: false },
    { id: '5', name: 'David Wilson', isVideoOn: true, isAudioOn: true, isSpeaking: false },
  ]);

  // Mock chat messages
  const [chatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Alice Johnson', message: 'Hello everyone!', timestamp: new Date(Date.now() - 300000) },
    { id: '2', sender: 'Bob Smith', message: 'Can you hear me clearly?', timestamp: new Date(Date.now() - 240000) },
    { id: '3', sender: 'You', message: 'Yes, loud and clear!', timestamp: new Date(Date.now() - 180000) },
    { id: '4', sender: 'Carol Davis', message: 'Great meeting so far', timestamp: new Date(Date.now() - 120000) },
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message
      setChatMessage('');
    }
  };

  const getGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2 grid-rows-2';
    if (count <= 6) return 'grid-cols-3 grid-rows-2';
    if (count <= 9) return 'grid-cols-3 grid-rows-3';
    return 'grid-cols-4 grid-rows-3';
  };

  const VideoTile = ({ participant, isMainView = false }: { participant: Participant; isMainView?: boolean }) => (
    <Card className={`relative group bg-video-bg border-video-border hover:border-primary/50 transition-all duration-300 overflow-hidden ${
      isMainView ? 'h-full' : 'aspect-video'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {participant.isVideoOn ? (
        <div className="w-full h-full bg-video-bg flex items-center justify-center text-6xl">
          📹
        </div>
      ) : (
        <div className="w-full h-full bg-video-bg flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl font-semibold">
            {participant.name.charAt(0)}
          </div>
        </div>
      )}
      
      {/* Video controls overlay */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button size="icon" variant="secondary" className="h-8 w-8 bg-control-bg/80 backdrop-blur-sm">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Participant info */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-control-bg/80 backdrop-blur-sm text-xs px-2 py-1">
            {participant.name}
          </Badge>
          {participant.isSpeaking && (
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {!participant.isAudioOn && (
            <div className="w-6 h-6 bg-destructive/80 rounded-full flex items-center justify-center">
              <MicOff className="h-3 w-3" />
            </div>
          )}
          {!participant.isVideoOn && (
            <div className="w-6 h-6 bg-muted/80 rounded-full flex items-center justify-center">
              <VideoOff className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="h-screen bg-gradient-bg flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video grid */}
        <div className="flex-1 p-4">
          <div className={`grid gap-3 h-full ${getGridClass(participants.length)}`}>
            {participants.map((participant) => (
              <VideoTile key={participant.id} participant={participant} />
            ))}
          </div>
        </div>
        
        {/* Chat sidebar */}
        {isChatOpen && (
          <div className="w-80 bg-chat-bg border-l border-border flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsChatOpen(false)}
                  className="h-8 w-8"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{msg.sender}</span>
                      <span>{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="text-sm bg-secondary/30 rounded-lg p-2">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Chat input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-control-bg border-video-border"
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  className="bg-gradient-primary shadow-purple"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom controls */}
      <div className="bg-card/80 backdrop-blur-sm border-t border-border p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-success text-success">
              <div className="w-2 h-2 bg-success rounded-full mr-2" />
              Live
            </Badge>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">
              {participants.length} participants
            </span>
          </div>
          
          {/* Center controls */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant={isAudioOn ? "secondary" : "destructive"}
              onClick={() => setIsAudioOn(!isAudioOn)}
              className="h-12 w-12 rounded-full shadow-elevated hover:scale-105 transition-transform"
            >
              {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button
              size="icon"
              variant={isVideoOn ? "secondary" : "destructive"}
              onClick={() => setIsVideoOn(!isVideoOn)}
              className="h-12 w-12 rounded-full shadow-elevated hover:scale-105 transition-transform"
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            
            <Button
              size="icon"
              variant={isScreenSharing ? "default" : "secondary"}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className="h-12 w-12 rounded-full shadow-elevated hover:scale-105 transition-transform"
            >
              <Monitor className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setIsInCall(!isInCall)}
              className="h-12 w-12 rounded-full shadow-elevated hover:scale-105 transition-transform bg-destructive"
            >
              {isInCall ? <PhoneOff className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="h-10 w-10 rounded-full relative"
            >
              <MessageSquare className="h-4 w-4" />
              {chatMessages.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-primary text-xs">
                  {chatMessages.length}
                </Badge>
              )}
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full"
            >
              <Users className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;