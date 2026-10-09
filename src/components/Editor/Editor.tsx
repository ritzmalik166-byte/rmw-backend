"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useEffect, useCallback } from "react";
import type { IJodit } from "jodit/esm/types/jodit";
import "jodit/es2021/jodit.min.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const DEFAULT_TOOLBAR_OFFSET = 72;

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  stickyToolbar?: boolean;
  toolbarOffset?: number;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  stickyToolbar = true,
  toolbarOffset = DEFAULT_TOOLBAR_OFFSET,
}) => {
  const editorRef = useRef<IJodit | null>(null);
  const initialValueRef = useRef(value);
  const lastSyncedExternalValue = useRef(value);
  const skipNextExternalSync = useRef(false);
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  const config = useMemo(
    () => ({
      readonly: false,
      toolbarAdaptive: false,
      toolbarSticky: stickyToolbar,
      toolbarStickyOffset: toolbarOffset,
      saveSelectionOnBlur: true,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "eraser",
        "|",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "link",
        "image",
        "video",
        "table",
        "hr",
        "copyformat",
        "|",
        "selectall",
        "print",
        "preview",
        "fullsize",
      ],
      cleanHTML: {
        fillEmptyParagraph: false,
        replaceNBSP: false,
        removeEmptyElements: false,
      },
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      pasteHTMLAction: "insert_as_html" as const,
      defaultActionOnPaste: "insert_as_html" as const,
      minHeight: 320,
    }),
    [stickyToolbar, toolbarOffset]
  );

  const syncEditorValue = useCallback((nextValue: string) => {
    const jodit = editorRef.current;
    if (!jodit) return;

    const applyValue = () => {
      if (jodit.value !== nextValue) {
        jodit.value = nextValue;
      }
    };

    if (jodit.isReady) {
      applyValue();
    } else {
      jodit.waitForReady().then(applyValue);
    }
  }, []);

  const handleChange = useCallback((newContent: string) => {
    skipNextExternalSync.current = true;
    onChangeRef.current(newContent);
  }, []);

  const handleBlur = useCallback((newContent: string) => {
    skipNextExternalSync.current = true;
    onChangeRef.current(newContent);
  }, []);

  useEffect(() => {
    if (skipNextExternalSync.current) {
      skipNextExternalSync.current = false;
      lastSyncedExternalValue.current = value;
      return;
    }

    if (value === lastSyncedExternalValue.current) {
      return;
    }

    lastSyncedExternalValue.current = value;
    syncEditorValue(value);
  }, [value, syncEditorValue]);

  return (
    <div
      className="editor-container"
      style={{ ["--jodit-toolbar-offset" as string]: `${toolbarOffset}px` }}
    >
      <JoditEditor
        ref={editorRef}
        value={initialValueRef.current}
        config={config}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Editor;
