import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "package",
    question: "Is Pane an npm package?",
    answer:
      "No. The shadcn CLI copies each component into your project, so you own the code and can change it.",
  },
  {
    value: "browsers",
    question: "Which browsers get the full effect?",
    answer:
      "Chromium browsers get edge refraction. Everyone else gets blur, tint and the pointer highlight.",
  },
  {
    value: "theming",
    question: "Can I change how the glass looks?",
    answer:
      "Yes. Tint, blur, borders and highlights are CSS variables in your globals.css.",
  },
];

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="package"
      className="w-96 max-w-full"
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
