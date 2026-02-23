"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Styles from "./style.css";

import TextBoldIcon from "@assets/icons/text-bold.svg";
import TextItalicIcon from "@assets/icons/text-italic.svg";
import TextUnderlineIcon from "@assets/icons/text-underline.svg";
import TextHyperlinkIcon from "@assets/icons/text-hyperlink.svg";

import sanitizeRichHtml from "./sanitize";
import { getClosestLinkInSelection, isValidUrl } from "./linkUtils";
import HyperlinkModal from "../Modal/Hyperlink/HyperlinkModal";

type Mode = "TEXT" | "RICH";

function isBlankTextNode(n: ChildNode) {
  return n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim() === "";
}

function isBr(n: ChildNode) {
  return n.nodeType === Node.ELEMENT_NODE && (n as Element).tagName === "BR";
}

function trimOuterBlankLines(root: HTMLElement) {
  while (root.firstChild) {
    const n = root.firstChild;
    if (isBlankTextNode(n) || isBr(n)) {
      root.removeChild(n);
      continue;
    }
    break;
  }

  while (root.lastChild) {
    const n = root.lastChild;
    if (isBlankTextNode(n) || isBr(n)) {
      root.removeChild(n);
      continue;
    }
    break;
  }
}

function trimBlankLinesText(input: string) {
  const s = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = s.split("\n");

  let start = 0;
  while (start < lines.length && lines[start].trim() === "") start++;

  let end = lines.length - 1;
  while (end >= start && lines[end].trim() === "") end--;

  return lines.slice(start, end + 1).join("\n");
}

function textToSafeHtmlWithBr(text: string) {
  return trimBlankLinesText(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

export function EditableInner({
  mode,
  value,
  onChange,
  placeholder,
  className,
}: {
  mode: Mode;
  value: string;
  onChange?: (next: string) => void;
  placeholder: string;
  className?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  const [isFocus, setIsFocus] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const [linkOpen, setLinkOpen] = useState(false);
  const savedRangeRef = useRef<Range | null>(null);

  const toolbars = useMemo(
    () => [
      { icon: TextBoldIcon, onClick: () => exec("bold"), ariaLabel: "Bold" },
      {
        icon: TextItalicIcon,
        onClick: () => exec("italic"),
        ariaLabel: "Italic",
      },
      {
        icon: TextUnderlineIcon,
        onClick: () => exec("underline"),
        ariaLabel: "Underline",
      },
      {
        icon: TextHyperlinkIcon,
        onClick: openLinkModal,
        ariaLabel: "Hyperlink",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function updateEmpty() {
    const el = editorRef.current;
    if (!el) return;
    const text = (el.textContent ?? "").replace(/\u00A0/g, " ").trim();
    setIsEmpty(text.length === 0);
  }

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    if (mode === "RICH") {
      if (el.innerHTML !== value) el.innerHTML = value;
    } else {
      if (el.innerText !== value) el.innerText = value;
    }

    updateEmpty();
  }, [value, mode]);

  function commit() {
    const el = editorRef.current;
    if (!el) return;

    if (mode === "RICH") sanitizeRichHtml(el);

    const next = mode === "RICH" ? el.innerHTML : el.innerText;
    onChange?.(next);
    updateEmpty();
  }

  function exec(cmd: string, arg?: string) {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    if (arg !== undefined) document.execCommand(cmd, false, arg);
    else document.execCommand(cmd);
    commit();
  }

  function restoreSelection() {
    const r = savedRangeRef.current;
    if (!r) return;
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(r);
  }

  function openLinkModal() {
    const el = editorRef.current;
    if (!el) return;
    el.focus();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const existing = getClosestLinkInSelection(el);
    if (existing) {
      exec("unlink");
      return;
    }

    if (sel.isCollapsed) {
      alert("Select text to create a link.");
      return;
    }

    savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    setLinkOpen(true);
  }

  function applyLink(url: string) {
    const el = editorRef.current;
    if (!el) return;
    if (!isValidUrl(url)) return;

    setLinkOpen(false);

    el.focus();
    restoreSelection();

    document.execCommand("createLink", false, url);

    const link = getClosestLinkInSelection(el);
    if (link) {
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }

    commit();
  }

  function handlePasteText(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const text = trimBlankLinesText(e.clipboardData.getData("text/plain"));
    document.execCommand("insertText", false, text);
    commit();
  }

  function handlePasteRich(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();

    const html = e.clipboardData.getData("text/html");
    const plain = e.clipboardData.getData("text/plain");

    if (html) {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;

      sanitizeRichHtml(tmp);
      trimOuterBlankLines(tmp);

      document.execCommand("insertHTML", false, tmp.innerHTML);
      commit();
      return;
    }

    document.execCommand("insertHTML", false, textToSafeHtmlWithBr(plain));
    commit();
  }

  return (
    <div
      className={`${Styles.Container({ isFocus, isRichText: mode === "RICH" })} ${className ?? ""}`}
    >
      {isEmpty && !isFocus && (
        <div className={Styles.Placeholder}>{placeholder}</div>
      )}

      {mode === "RICH" && isFocus && (
        <div
          className={Styles.ToolbarContainer}
          onMouseDown={(e) => e.preventDefault()}
        >
          {toolbars.map((t) => (
            <button
              key={`TOOLBAR_${t.ariaLabel}`}
              type="button"
              className={Styles.ToolbarButton}
              onClick={t.onClick}
              aria-label={t.ariaLabel}
            >
              <t.icon className={Styles.ToolbarButtonIcon} />
            </button>
          ))}
        </div>
      )}

      <div
        className={Styles.Content}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => {
          setIsFocus(true);
          updateEmpty();
        }}
        onBlur={() => {
          if (mode === "RICH" && linkOpen) return;
          setIsFocus(false);
          commit();
        }}
        onInput={commit}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t.closest("a")) e.preventDefault();
        }}
        onPaste={mode === "TEXT" ? handlePasteText : handlePasteRich}
      />

      {mode === "RICH" && (
        <HyperlinkModal
          open={linkOpen}
          onClose={() => setLinkOpen(false)}
          onApply={applyLink}
        />
      )}
    </div>
  );
}

const Editable = ({
  mode,
  value,
  editable,
  onChange,
  className,
  placeholder = "Input text here...",
}: {
  mode: Mode;
  value: string;
  editable?: boolean;
  onChange?: (next: string) => void;
  className?: string;
  placeholder?: string;
}) => {
  if (!editable) {
    return mode === "RICH" ? (
      <p
        className={`${className ?? ""} ${Styles.RichTextContent}`}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    ) : (
      <p className={className}>{value}</p>
    );
  }

  return (
    <EditableInner
      mode={mode}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Editable;
