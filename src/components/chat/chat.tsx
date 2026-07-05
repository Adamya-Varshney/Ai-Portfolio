'use client';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import { PresetReply } from '@/components/chat/preset-reply';
import { presetReplies } from '@/lib/config-loader';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import HelperBoost from './HelperBoost';

//@ts-ignore
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

interface AvatarProps {
  hasActiveTool: boolean;
}

const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ hasActiveTool }: AvatarProps) => {
      return (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <img
              src="/profile.png"
              alt="Avatar"
              className="h-full w-full object-cover object-[center_top_-5%] scale-95 rounded-full"
            />
          </div>
        </div>
      );
    }),
  { ssr: false }
);

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

const FALLBACK_REPLY =
  "Thanks for asking! I answer through the quick questions below — tap Me, Projects, Skills, Resume, or Contact. For anything more specific, the Contact section has the best ways to reach me directly.";

const Chat = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [presetReply, setPresetReply] = useState<{
    question: string;
    reply: string;
    tool: string;
  } | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    stop,
    setInput,
    reload,
    addToolResult,
  } = useChat();

  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    const latestAIMessageIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    const latestUserMessageIndex = messages.findLastIndex(
      (m) => m.role === 'user'
    );

    const result = {
      currentAIMessage:
        latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
      latestUserMessage:
        latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
      hasActiveTool: false,
    };

    if (result.currentAIMessage) {
      result.hasActiveTool =
        result.currentAIMessage.parts?.some(
          (part) =>
            part.type === 'tool-invocation' &&
            part.toolInvocation?.state === 'result'
        ) || false;
    }

    if (latestAIMessageIndex < latestUserMessageIndex) {
      result.currentAIMessage = null;
    }

    return result;
  }, [messages]);

  const isToolInProgress = false;

  //@ts-ignore
  const submitQuery = (query) => {
    if (!query.trim()) return;

    if (presetReplies[query]) {
      const preset = presetReplies[query];
      setPresetReply({ question: query, reply: preset.reply, tool: preset.tool });
      setLoadingSubmit(false);
      return;
    }

    setPresetReply({ question: query, reply: FALLBACK_REPLY, tool: '' });
    setLoadingSubmit(false);
  };

  //@ts-ignore
  const submitQueryToAI = (query) => {
    submitQuery(query);
  };

  //@ts-ignore
  const handlePresetReply = (question, reply, tool) => {
    setPresetReply({ question, reply, tool });
    setLoadingSubmit(false);
  };

  //@ts-ignore
  const handleGetAIResponse = (question, tool) => {
    setPresetReply({ question, reply: FALLBACK_REPLY, tool: '' });
    setLoadingSubmit(false);
  };

  useEffect(() => {
    if (initialQuery && !autoSubmitted) {
      setAutoSubmitted(true);
      setInput('');
      submitQuery(initialQuery);
    }
  }, [initialQuery, autoSubmitted]);

  //@ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    submitQuery(input);
    setInput('');
  };

  const handleStop = () => {
    stop();
    setLoadingSubmit(false);
  };

  const isEmptyState = !presetReply && !loadingSubmit;
  // Show avatar only on landing (isEmptyState) and ME section (getPresentation)
  const hideAvatar = presetReply !== null && presetReply.tool !== 'getPresentation';

  const headerHeight = hasActiveTool ? 100 : 180;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Fixed Avatar Header with Gradient — hidden on desktop landing */}
      <div
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out ${(hideAvatar || isEmptyState) ? 'lg:pointer-events-none lg:opacity-0 lg:-translate-y-full' : ''} ${hideAvatar ? 'pointer-events-none opacity-0 -translate-y-full' : ''}`}
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}
        >
          <div className="flex justify-center">
            <ClientOnly>
              <Avatar
                hasActiveTool={hasActiveTool}
              />
            </ClientOnly>
          </div>

          <AnimatePresence>
            {latestUserMessage && !currentAIMessage && (
              <motion.div
                {...MOTION_CONFIG}
                className="mx-auto flex max-w-3xl lg:max-w-5xl px-4"
              >
                <ChatBubble variant="sent">
                  <ChatBubbleMessage>
                    <ChatMessageContent
                      message={latestUserMessage}
                      isLast={true}
                      isLoading={false}
                      reload={() => Promise.resolve(null)}
                    />
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto flex h-full max-w-3xl lg:max-w-5xl flex-col">
        {/* Scrollable Chat Content */}
        <div
          className={`flex-1 overflow-y-auto px-2 pb-4 ${isEmptyState ? 'lg:!pt-0' : ''}`}
          style={{ paddingTop: hideAvatar ? '0px' : `${headerHeight}px`, transition: 'padding-top 300ms ease-in-out' }}
        >
          <AnimatePresence mode="wait">
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                {...MOTION_CONFIG}
              >
                <ChatLanding
                  submitQuery={submitQuery}
                  handlePresetReply={handlePresetReply}
                />
              </motion.div>
            ) : presetReply ? (
              <div className="pb-4">
                <PresetReply
                  question={presetReply.question}
                  reply={presetReply.reply}
                  tool={presetReply.tool}
                  onGetAIResponse={handleGetAIResponse}
                  onClose={() => setPresetReply(null)}
                />
              </div>
            ) : currentAIMessage ? (
              <div className="pb-4">
                <SimplifiedChatView
                  message={currentAIMessage}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                />
              </div>
            ) : (
              loadingSubmit && (
                <motion.div
                  key="loading"
                  {...MOTION_CONFIG}
                  className="px-4 pt-18"
                >
                  <ChatBubble variant="received">
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="sticky bottom-0 bg-white px-2 pt-3 md:px-0 md:pb-4">
          <div className="relative flex flex-col items-center gap-3">
            <HelperBoost 
              submitQuery={submitQuery} 
              setInput={setInput} 
              handlePresetReply={handlePresetReply}
            />
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={onSubmit}
              isLoading={isLoading}
              stop={handleStop}
              isToolInProgress={isToolInProgress}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
