
function TabContent() {
  return (
    <section className="w-full flex justify-center items-center sticky top-14 z-40 border-b border-gray-300">
      <div className="max-w-5xl flex-1 flex flex-col gap-4 pt-6">
        <h2 className="text-xl text-gray-800 font-medium">My Events</h2>
        <div className="flex gap-3 text-xs text-gray-400">
          <p className="px-3 py-1 cursor-pointer">Upcoming <span>{`(0)`}</span></p>
          <p className="px-3 py-1 cursor-pointer">Past <span>{`(0)`}</span></p>
          <p className="px-3 py-1 text-orange-500 font-medium border-b border-orange-500 cursor-pointer">Saved <span>{`(0)`}</span></p>
        </div>
      </div>
    </section>
  )
}

export default TabContent