"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {PartialBlock } from "@blocknote/core";
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "next-themes";

interface EditorProps {
  editable: boolean;
  onChange: (content: string) => void;
  initialContent: any;
}

const Editor: React.FC<EditorProps> = ({ editable, onChange, initialContent }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const {resolvedTheme} = useTheme()

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleInput = () => {
    onChange(JSON.stringify(editor.document,null,2))
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    
  });

  return <BlockNoteView editable={editable} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} editor={editor} onChange={handleInput}/>
};

export default Editor;


 
 