import type { ComponentType } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import { PreviewSurface } from "@/components/docs/preview-surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getExampleSource } from "@/lib/registry-source";

export async function ComponentPreview({
  registryName,
  demo: Demo,
}: {
  registryName: string;
  demo: ComponentType;
}) {
  const code = getExampleSource(registryName);

  return (
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <PreviewSurface>
          <Demo />
        </PreviewSurface>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} showLineNumbers />
      </TabsContent>
    </Tabs>
  );
}
