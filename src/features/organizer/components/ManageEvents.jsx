import { FiEdit3 } from "react-icons/fi";
import { BsBarChart } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const valueLabelPlugin = {
  id: "valueLabel",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, dsIndex) => {
      const meta = chart.getDatasetMeta(dsIndex);
      meta.data.forEach((bar, i) => {
        ctx.save();
        ctx.fillStyle = "#6b7280";
        ctx.font = "600 13px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(dataset.data[i], bar.x, bar.y - 24);
        ctx.restore();
      });
    });
  },
};

function ManageEvents({
  labels = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  values = [21, 38, 34, 56, 29, 48],
  highlightIndex = 3,
}) {
    const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: values.map((_, i) =>
          i === highlightIndex ? "#f4511e" : "#fbd6c2"
        ),
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 28 } },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#eef0f2" },
        border: { display: false },
        ticks: { color: "#9ca3af", stepSize: 20, font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#9ca3af", font: { size: 12 } },
      },
    },
  };
  return (
    <>
        <div className="w-full flex gap-4">
            <div className="w-full flex-2 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900">Your Events</h3>
                <div className="flex flex-col gap-2">
                    <div className="w-full flex gap-4 px-5 py-3 bg-white border border-gray-200 rounded-xl">
                        <div className="w-20 h-14"><img src="src\assets\images\event\go.jpg" alt="Go concurrency" className="w-full h-full rounded-lg object-cover"/></div>
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center leading-3">
                                    <p className="text-xs font-medium text-gray-900 leading-1">Go Concurrency Workshop</p>
                                    <span className="text-[11px] text-green-700 bg-green-500/30 w-10 font-medium text-center rounded-lg">Active</span>
                                </div>
                                <div className="flex gap-2 text-[12px] text-gray-400">
                                    <span>Aug 22, 2026</span>
                                    <span>•</span>
                                    <span>Bandung</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs">48 attendees</span>
                                    <span className="text-xs">100 capacity</span>
                                </div>
                                <div className="w-full relative h-1.5 rounded-full bg-gray-200 before:content-[''] before:absolute before:w-48 before:h-1.5 before:bg-green-600 before:rounded-full" ></div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-20 h-8 flex justify-center items-center font-medium gap-2 text-xs text-gray-700 border border-gray-200 rounded-lg cursor-pointer shadow-xs"><FiEdit3/> Edit</button>
                                 <button className="w-30 h-8 flex justify-center items-center font-medium gap-2 text-xs text-gray-700 border border-gray-200 rounded-lg cursor-pointer shadow-xs"><IoEyeOutline/> 48 Attendees</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-4 px-5 py-3 bg-white border border-gray-200 rounded-xl">
                        <div className="w-20 h-14"><img src="src\assets\images\event\pmm.jpg" alt="Go concurrency" className="w-full h-full rounded-lg object-cover"/></div>
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center leading-3">
                                    <p className="text-xs font-medium text-gray-900 leading-1">Kubernetes Workshop</p>
                                    <span className="text-[11px] text-green-700 bg-green-500/30 w-10 font-medium text-center rounded-lg">Active</span>
                                </div>
                                <div className="flex gap-2 text-[12px] text-gray-400">
                                    <span>Sep 12, 2026</span>
                                    <span>•</span>
                                    <span>Bandung</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs">55 attendees</span>
                                    <span className="text-xs">80 capacity</span>
                                </div>
                                <div className="w-full relative h-1.5 rounded-full bg-gray-200 before:content-[''] before:absolute before:w-55 before:h-1.5 before:bg-green-600 before:rounded-full" ></div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-20 h-8 flex justify-center items-center font-medium gap-2 text-xs text-gray-700 border border-gray-200 rounded-lg cursor-pointer shadow-xs"><FiEdit3/> Edit</button>
                                 <button className="w-30 h-8 flex justify-center items-center font-medium gap-2 text-xs text-gray-700 border border-gray-200 rounded-lg cursor-pointer shadow-xs"><IoEyeOutline/> 55 Attendees</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex-1 flex flex-col">
                <div className="flex flex-col gap-3">
                    <div className="w-full max-w-sm rounded-lg flex flex-col gap-4 bg-white p-4 border border-gray-200">
                        <div className="flex items-center gap-2">
                            <BsBarChart className="w-3.5 h-3.5 text-gray-400" />
                            <h4 className="font-semibold text-xs text-gray-900">Registrations (6 months)</h4>
                        </div>
                        <div className="h-56">
                            <Bar data={data} options={options} plugins={[valueLabelPlugin]} />
                        </div>
                    </div>
                    <div className="w-full p-4 grid gap-4 border border-gray-200 rounded-lg bg-white">
                        <h4 className="text-gray-900 font-medium text-xs">Quick Actions</h4>
                        <div className="flex flex-col gap-2">
                            <button className="w-full h-8 bg-orange-600 text-white text-xs flex justify-center items-center font-medium rounded-lg cursor-pointer">+ Create New Event</button>
                            <button className="w-full h-8 bg-gray-200 text-gray-900 text-xs flex justify-center font-medium items-center gap-2 rounded-lg cursor-pointer"><IoEyeOutline/> Preview as Attendee</button>
                        </div>
                    </div>
                    <div className="w-full p-4 grid gap-4 border border-gray-200 rounded-lg bg-white">
                        <h4 className="text-gray-900 font-semibold text-xs">Upcoming Events</h4>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                    <div className="leading-2">
                                        <p className="text-xs font-medium text-gray-900">Go Concurrency Workshop</p>
                                        <span className="text-[11px] text-gray-400">Aug 22, 2026</span>
                                    </div>
                                </div>
                                <span className="text-gray-400 text-xs">48/100</span>
                            </div>
                           <div className="flex justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                    <div className="leading-3">
                                        <p className="text-xs font-medium text-gray-900">Kubernetes Workshop</p>
                                        <span className="text-[11px] text-gray-400">Sep 12, 2026</span>
                                    </div>
                                </div>
                                <span className="text-gray-400 text-xs">55/80</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ManageEvents