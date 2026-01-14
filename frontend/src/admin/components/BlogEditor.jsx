"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function BlogEditor({ value = "", onChange }) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="mjfqvdff6aafjsks9edtfj6lzb05gb1ytky1uoef4373n3qt"
      value={value}
      onEditorChange={(content) => onChange(content)}
      onInit={(evt, editor) => (editorRef.current = editor)}
   init={{
  height: 400,
  menubar: true,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "searchreplace",
    "visualblocks",
    "code",          // ✅ REQUIRED
    "fullscreen",
    "media",
    "table",
    "help",
    "wordcount"
  ],
  toolbar:
    "undo redo | blocks | " +
    "bold italic underline | " +
    "bullist numlist | " +
    "link image table | " +
    "code fullscreen help" // ✅ ADD code HERE
}}

    />
  );
}
