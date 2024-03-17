"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ManageSongPlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlayingTimelineContent: boolean;
  setIsPlayingTimelineContent: (isPlaying: boolean) => void;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
}

// 初期値に適切な型のダミー関数を設定
const defaultValue: ManageSongPlayerContextType = {
  audioRef: { current: null },
  isPlayingTimelineContent: false,
  setIsPlayingTimelineContent: () => {},
  previewUrl: "",
  setPreviewUrl: () => {},
};
const ManageSongPlayerContext =
  createContext<ManageSongPlayerContextType>(defaultValue);

export const ManageSongPlayerProvider = ({ children }) => {
  const [isPlayingTimelineContent, setIsPlayingTimelineContent] = useState(
    defaultValue.isPlayingTimelineContent,
  );
  const [previewUrl, setPreviewUrl] = useState(defaultValue.previewUrl);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const value = {
    audioRef,
    isPlayingTimelineContent,
    setIsPlayingTimelineContent,
    previewUrl,
    setPreviewUrl,
  };

  useEffect(() => {
    audioRef.current = new Audio(previewUrl);
  }, [previewUrl]);

  return (
    <ManageSongPlayerContext.Provider value={value}>
      {children}
    </ManageSongPlayerContext.Provider>
  );
};

export const useManageSongPlayer = () => useContext(ManageSongPlayerContext);
