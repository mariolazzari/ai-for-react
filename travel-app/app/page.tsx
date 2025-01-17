import Chat from "@/components/chat";
import Completion from "@/components/completion";
import HookAction from "@/components/hook-action";
import Objects from "@/components/objects";
import StreamClient from "@/components/stream-client";

function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Travel App by Vercel AI</h1>
      <Completion />
      <Chat />
      <HookAction />
      <Objects />
      <StreamClient />
    </main>
  );
}

export default Home;
