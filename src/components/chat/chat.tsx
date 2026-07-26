'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatList from '@/components/chat/chat-list';
import { Message, useChat } from '@/hooks/use-chat';

interface AvatarProps {
  hasActiveTool: boolean;
}

const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ hasActiveTool }: AvatarProps) => {
      return (
        <div
          className={`flex items-center justify-center transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <img
              src="/profile.png"
              alt="Avatar"
              className="h-full w-full object-cover object-[center_top_-5%] scale-95"
            />
          </div>
        </div>
      );
    }),
  { ssr: false }
);
