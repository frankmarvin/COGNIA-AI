export default function TopBar() {
  return (
    <div className="flex items-center justify-between px-4 py-3">

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-200">
          ☰
        </button>

        <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
          ✨ Get Plus
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-200">
          👤
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200">
          💬
        </button>
      </div>

    </div>
  );
}
