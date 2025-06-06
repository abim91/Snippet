import { db } from "@/db";
import React from "react";

import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";
interface SnippetShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetEditPage({
  params,
}: SnippetShowPageProps) {
  const { id } = await params;
  const idValue = parseInt(id);
  const snippet = await db.snippet.findFirst({ where: { id: idValue } });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
