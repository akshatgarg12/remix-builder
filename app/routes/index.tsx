import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import {builder, BuilderComponent, Builder} from "@builder.io/react";
import Counter from "~/components/Counter";
builder.init("8335d18816304315aebeb7e9532281ce")

Builder.registerComponent(Counter, {
  name : 'Counter'
})

export const loader:LoaderFunction = async () => {
  const content = await builder.get("page", {
          options: { includeUnpublished: true },
          userAttributes: { urlPath: '/remix' },
        }).promise()
  return json(content)
};

export default function Index() {
  const page = useLoaderData<typeof loader>()
  return (
    <div>
      <BuilderComponent model="page" content={page} />
    </div>
  );
}
