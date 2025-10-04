"use client";

import { useVapi } from "@/modules/hooks/use-vapi";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { useMutation, useQuery } from "convex/react";
import { PhoneOffIcon, PhoneOutgoingIcon } from "lucide-react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    endCall,
    transcript,
  } = useVapi();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <ButtonGroup>
          <Button onClick={() => startCall()}>
            <PhoneOutgoingIcon /> Start Call
          </Button>
          <Button onClick={() => endCall()}>
            <PhoneOffIcon /> End Call
          </Button>
        </ButtonGroup>
        <div className="flex flex-col gap-2">
          <p>isConnected: {`${isConnected}`}</p>
          <p>isConnecting: {`${isConnecting}`}</p>
          <p>isSpeaking: {`${isSpeaking}`}</p>
        </div>
        <pre>{JSON.stringify(transcript, null, 2)}</pre>
      </div>
    </div>
  );
}
