import { Link } from "react-router";
import { FiPlusCircle } from "react-icons/fi";

import Statistik from "../components/Statistik";
import ManageEvents from "../components/ManageEvents";

function Dashboard() {
  return (
    <>
        <main className="w-full min-h-screen flex justify-center items-center py-6">
            <section className="max-w-5xl h-full flex-1 flex flex-col gap-7 ">
                <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl text-gray-900 font-bold">Organizer Dashboard</h2>
                        <p className="text-xs text-gray-500">Manage your events and track performance.</p>
                    </div>
                    <Link to="create-event">
                        <button className="w-30 h-8 flex justify-center items-center font-medium rounded-lg gap-2 text-xs text-gray-100 bg-orange-600 cursor-pointer">
                            <FiPlusCircle/>
                            Create Event
                        </button>
                    </Link>
                </div>
                <Statistik/>
                <ManageEvents/>
            </section>
        </main>
    </>
  )
}

export default Dashboard