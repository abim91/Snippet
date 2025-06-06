import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as action from "@/actions/index";
//params: Promise<{ id: string }>;
interface SnippetShowPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000)); //artifically creating delay
  // const { id } = await props.params;
  const promiseId = await props.params;
  const id = parseInt(promiseId.id);
  const snippet = await db.snippet.findFirst({
    where: { id: id },
  });
  if (!snippet) {
    return notFound();
  }
  console.log(snippet);
  const deleteSnippetAction = action.deleteSnippet.bind(null, id);
  return (
    <div>
      <div className="flex m-4 flex-col justify-between ">
        {/* <div></div> */}
        <Link className="" href={`/`}>
          Home
        </Link>
        <div className="flex  justify-between items-center">
          <h1 className="text-xl font-bold">{snippet.title}</h1>
          <div className="flex gap-4">
            <Link className="border p-2 rounded" href={`/snippets/${id}/edit`}>
              Edit
            </Link>

            <form action={deleteSnippetAction}>
              <button className="border p-2 rounded">Delete</button>
            </form>
          </div>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
