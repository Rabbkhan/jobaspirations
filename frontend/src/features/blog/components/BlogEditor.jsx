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
      onInit={(_, editor) => (editorRef.current = editor)}
      init={{
        height: 500,
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
          "fullscreen",
          "media",
          "table",
          "help",
          "wordcount",
          "code",        // source view
          "codesample"   // code blocks ONLY
        ],

        // ❌ codesample NOT in main toolbar
        toolbar:
          "undo redo | blocks | " +
          "bold italic underline | " +
          "bullist numlist | " +
          "link image table | " +
          "code fullscreen help",

        branding: false,

        content_style: `
          body {
            font-family: Inter, system-ui, sans-serif;
            font-size: 16px;
            line-height: 1.75;
          }
          h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            margin-top: 1.4em;
            margin-bottom: 0.6em;
          }
          p {
            margin-bottom: 1em;
          }
          ul, ol {
            margin-left: 1.5em;
            margin-bottom: 1em;
          }
          pre {
            background: #0f172a;
            color: #e5e7eb;
            padding: 1em;
            border-radius: 8px;
            overflow-x: auto;
          }
          code {
            background: #e5e7eb;
            padding: 0.2em 0.4em;
            border-radius: 4px;
          }
        `,

        valid_elements: "*[*]",

        codesample_languages: [
          { text: "HTML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "CSS", value: "css" },
          { text: "Python", value: "python" },
          { text: "Java", value: "java" }
        ]
      }}
    />
  );
}
