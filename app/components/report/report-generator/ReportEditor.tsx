'use client'

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { DivNode, ClassPreserver } from "@/app/utils/tiptapExtensions"

interface Props {
    content: string
    onContentChange: (content: string) => void
}

const ReportEditor = ({ content, onContentChange }: Props) => {
    const editor = useEditor({
        extensions: [StarterKit, DivNode, ClassPreserver],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onContentChange(editor.getHTML())
        }
    })

    return (
        <div className="w-full bg-white/5 border border-white/10 rounded-lg p-6 prose prose-invert prose-sm !max-w-none mb-6 h-[60vh] overflow-y-auto">
            <EditorContent editor={editor} />
        </div>
    )
}

export default ReportEditor
