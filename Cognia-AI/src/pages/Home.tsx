import TopBar from "@/components/TopBar";
import PromptInput from "@/components/PromptInput";
import { Image, Code, BarChart3, Eye } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">

      <TopBar />

      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">

        <h1 className="text-3xl md:text-4xl font-semibold mb-8">
          What can I help with?
        </h1>

        <div className="flex flex-wrap gap-4 justify-center">

          <FeatureButton icon={<Image size={18} />} label="Create image" />
          <FeatureButton icon={<Code size={18} />} label="Code" />
          <FeatureButton icon={<BarChart3 size={18} />} label="Analyze data" />
          <FeatureButton icon={<Eye size={18} />} label="Analyze images" />

        </div>
      </div>

      <PromptInput />

    </div>
  );
}

function FeatureButton({ icon, label }: any) {
  return (
    <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-white shadow-sm hover:shadow-md transition border text-sm">
      {icon}
      {label}
    </button>
  );
          }
