export default function PromptInput() {
  return (
    <div className="border-t bg-white p-3">
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">

        <button className="p-2 text-gray-500">+</button>

        <input
          type="text"
          placeholder="Ask Cognia AI"
          className="flex-1 bg-transparent outline-none px-2 text-sm"
        />

        <button className="p-2 text-gray-500">🎤</button>

        <button className="p-2 bg-black text-white rounded-full ml-2">
          ⬆
        </button>

      </div>
    </div>
  );
}
