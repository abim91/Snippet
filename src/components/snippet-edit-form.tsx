"use client";
import type { Snippet } from "@/generated/prisma";
import Editor from "@monaco-editor/react";
import { useState } from "react";
// import { revalidatePath } from "next/cache";
import * as action from "@/actions";
// import { redirect } from "next/navigation";
// importing all the funcitons from @/action and we can call a specific function using
//action.functionName()
interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setNewCode] = useState(snippet.code);
  const handleEditorChange = (value: string = "") => {
    console.log(value);
    setNewCode(value);

    // const id = snippet.id;
    // revalidatePath(`/snippets/${id}`);
    // redirect(`/snippets/${id}`);
  };

  const editSnippetAction = action.editSnippet.bind(null, snippet.id, code);
  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
