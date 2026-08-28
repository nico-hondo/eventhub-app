import { useState } from "react";
import { Link } from "react-router";
import { LuCloudUpload } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";

function BasicInformationCreate() {

     const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    }
  return (
    <>
        <section className="w-full flex justify-center pt-2 pb-4">
            <div className="max-w-4xl flex-1 flex flex-col gap-6">
                <div className="block">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <p className="text-gray-500 text-xs">Tell attendees what your event is about.</p>
                </div>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="font-medium text-gray-700 text-xs">Cover Image</span>
                        <label 
                            htmlFor="photo" 
                            className="w-full h-40 flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition"
                        >
                            <input 
                                type="file" 
                                name="photo" 
                                id="photo" 
                                className="hidden" // sembunyiin input aslinya
                                accept="image/png, image/jpeg" 
                                onChange={handleFileChange}
                            />
                            
                            <LuCloudUpload className="w-8 h-8 text-gray-400" />

                            {fileName? (
                                <p className="text-sm text-gray-700 font-medium">{fileName}</p>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB · 16:9 recommended</p>
                                </>
                            )}
                        </label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="font-medium text-gray-700 text-xs">Event Title</label>
                        <input type="text" id="title" placeholder="Go Concurrency Workshop" name="title" className="w-full h-10 px-4 border border-gray-200 rounded-lg bg-white text-xs font-medium"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="desc" className="font-medium text-gray-700 text-xs">Description</label>
                        <textarea name="desc" id="desc" placeholder="What will attendees learn or experience?" className="w-full h-30 px-4 py-2 border border-gray-200 rounded-lg bg-white text-xs"></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="font-medium text-gray-700 text-xs">Category</label>
                        <select name="category" id="category" className="w-full h-10 px-4 text-xs text-gray-600 border border-gray-200 rounded-lg">
                            <option value=" " selected disabled>------ Select a Category ------</option>
                            <option value="Technology">Technology</option>
                            <option value="AI">AI</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Devops">Devops</option>
                            <option value="Programming">Programming</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="Conference">Conference</option>
                            <option value="Cloud">Cloud</option>
                            <option value="Backend">Backend</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="community" className="font-medium text-gray-700 text-xs">Community (optional)</label>
                        <select name="community" id="community" className="w-full h-10 px-4 text-xs text-gray-600 border border-gray-200 rounded-lg bg-white">
                            <option value="No Community" selected>No Community</option>
                        </select>
                    </div>
                </form>
                <div className="w-full h- bg-gray-200 rounded-lg"></div>
                <div className="w-full flex justify-between items-center">
                    <button className="w-20 h-8 text-xs text-gray-700 font-medium border border-gray-200 rounded-lg cursor-pointer">Cancel</button>
                    <Link to="detail">
                        <button className="w-28 h-8 flex gap-2 justify-center items-center text-xs text-gray-100 font-medium bg-orange-600 rounded-lg cursor-pointer">Continue <IoIosArrowRoundForward className="text-md"/></button>
                    </Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default BasicInformationCreate