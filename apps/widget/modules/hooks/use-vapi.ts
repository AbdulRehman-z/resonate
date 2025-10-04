import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";

type Transcript = {
  role: "assistant" | "user";
  message: string;
};

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Transcript[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi("a4d1d905-6d9c-4bc1-8bfe-f88f645dbffa");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
      setIsConnecting(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi Error", error);
      setIsConnecting(false);
    });

    vapiInstance.on("message", (message) => {
      console.log({ message });
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            message: message.transcript,
          },
        ]);
      }
    });

    return () => {
      vapiInstance.stop();
    };
  }, []);

  const startCall = () => {
    if (vapi) {
      vapi.start("3c9c8ca0-2563-4cda-96ab-446dfd52bb17");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    startCall,
    endCall,
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
  };
};
