/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  ImageIcon,
  Link2,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateBlogImageMutation } from "../../app/redux/api/blogImgApi";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const RichTextEditor = ({ value, onChange }: Props) => {
  const [blogImage] = useCreateBlogImageMutation();

  const [uploading, setUploading] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),

      Image.configure({
        inline: false,
        allowBase64: true,
      }),

      Placeholder.configure({
        placeholder: "Write your professional blog content here...",
      }),
    ],

    content: value || "<p></p>",

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] px-5 py-4 focus:outline-none [&_p]:my-1 [&_h1]:my-2 [&_h2]:my-2 [&_h3]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_blockquote]:my-2",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await blogImage(formData);
        console.log(res.data?.data?.url);
        editor
          .chain()
          .focus()
          .setImage({ src: res.data?.data?.url as string })
          .run();
      } catch (err: any) {
        toast.error(err.message as string);
      } finally {
        setUploading(false);
      }
    };
  };

  const toolbarButtons = [
    {
      icon: <Bold size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleBold().run()) {
          editor.chain().focus().toggleBold().run();
        }
      },
      active: editor.isActive("bold"),
    },

    {
      icon: <Italic size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleItalic().run()) {
          editor.chain().focus().toggleItalic().run();
        }
      },
      active: editor.isActive("italic"),
    },

    {
      icon: <UnderlineIcon size={18} />,
      action: () => {
        editor.chain().focus().toggleUnderline().run();
      },
      active: editor.isActive("underline"),
    },

    {
      icon: <Heading1 size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleHeading({ level: 1 }).run()) {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }
      },
      active: editor.isActive("heading", { level: 1 }),
    },

    {
      icon: <Heading2 size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleHeading({ level: 2 }).run()) {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }
      },
      active: editor.isActive("heading", { level: 2 }),
    },

    {
      icon: <Heading3 size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleHeading({ level: 3 }).run()) {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }
      },
      active: editor.isActive("heading", { level: 3 }),
    },

    {
      icon: <List size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleBulletList().run()) {
          editor.chain().focus().toggleBulletList().run();
        }
      },
      active: editor.isActive("bulletList"),
    },

    {
      icon: <ListOrdered size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleOrderedList().run()) {
          editor.chain().focus().toggleOrderedList().run();
        }
      },
      active: editor.isActive("orderedList"),
    },

    {
      icon: <Quote size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleBlockquote().run()) {
          editor.chain().focus().toggleBlockquote().run();
        }
      },
      active: editor.isActive("blockquote"),
    },

    {
      icon: <Code size={18} />,
      action: () => {
        if (editor.can().chain().focus().toggleCodeBlock().run()) {
          editor.chain().focus().toggleCodeBlock().run();
        }
      },
      active: editor.isActive("codeBlock"),
    },
  ];

  return (
    <div className="w-full border rounded-2xl bg-white shadow-md overflow-hidden">
      {/* Toolbar */}
      <div className="sticky top-0 z-20 bg-white border-b p-3 flex flex-wrap gap-2">
        {toolbarButtons.map((btn, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="icon"
            onClick={btn.action}
            className={cn(
              "rounded-xl hover:bg-gray-100",
              btn.active &&
                "bg-black text-white hover:bg-black hover:text-white",
            )}
          >
            {btn.icon}
          </Button>
        ))}

        {/* Link Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={addLink}
          className="rounded-xl"
        >
          <Link2 size={18} />
        </Button>

        {/* Image Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={addImage}
          className="rounded-xl"
        >
          <ImageIcon size={18} />
        </Button>
        {uploading && (
          <div className="text-xs text-blue-600 flex items-center gap-2">
            <span className="animate-spin h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full" />
            Uploading image...
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="bg-gray-50 max-h-[400px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
