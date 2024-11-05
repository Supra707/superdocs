'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import React from 'react';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor() {
  const initialConfig = {
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full w-3/5 md:w-4/5 ">
        <ToolbarPlugin />

        <div className="editor-inner h-[1100px] bg-yellow-100 ">

          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input h-full font-semibold text-black text-xl" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
