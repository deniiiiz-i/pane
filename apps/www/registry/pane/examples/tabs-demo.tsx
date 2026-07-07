import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="music" className="w-full max-w-sm items-center">
      <TabsList>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
      <TabsContent value="music" className="text-muted-foreground text-sm">
        Your library, synced across every device.
      </TabsContent>
      <TabsContent value="photos" className="text-muted-foreground text-sm">
        Every photo, organized automatically.
      </TabsContent>
      <TabsContent value="files" className="text-muted-foreground text-sm">
        Documents that stay out of the way.
      </TabsContent>
    </Tabs>
  );
}
