"use client";
import { useActionState } from "react";
import * as actions from "@/actions/index";

// export default function SnippetCreatePage() {
// async function createSnippet(formData: FormData) {
//   //This needs to be a server action
//   "use server"; //this is special to next

//   //Check the user's input to make sure it is valid
//   const title = formData.get("title") as string;
//   const code = formData.get("code") as string;

//   console.log(title);
//   //Create a new record in the database
//   const snippet = await db.snippet.create({
//     data: {
//       title: title,
//       code: code,
//     },
//   });

//   console.log("snippet : " + snippet);
//   //Redirect the user back to the root router

//   redirect("/");
// }
export default function SnippetCreatePage() {
  const [formState, action] = useActionState(actions.createSnippet, {
    message: "",
  });
  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          ></input>
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <input
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          ></input>
        </div>
        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}
        <button type="submit" className=" rounded p-2 bg-blue-200">
          Submit
        </button>
      </div>
    </form>
  );
}
