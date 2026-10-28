import { NavLink, Outlet, useLocation } from "react-router";
import { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdOutlineLocationOn } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FiEdit2, FiX, FiCamera } from "react-icons/fi";

import themeContext from "../../../context/theme/themeContext";
import { selectSession, selectRole } from "../../auth/store/authSelectors";
import { resetPasswordThunk, updateProfileThunk } from "../../../redux/slices/registerSlice";
import { fetchProfileUser } from "../../../redux/slices/userSlice";
import { convertDate } from "../../../components/utils/utilitas";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function ProfileLayout() {
  const { theme } = useContext(themeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPassOpen, setIsModalPassOpen] = useState(false);

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  //lanjutkan besok membuat hook form
  const {register, handleSubmit, setError, formState:}

  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const role = useSelector(selectRole);

  useEffect(() => {
    dispatch(fetchProfileUser())
  }, [dispatch])

  const { userProfile, isPending } = useSelector((state) => state.user);

  const {myEvents} = useSelector((state) => state.events)
  const {saved_events} = useSelector((state) => state.events)

  console.log(userProfile);
  
  const fileInputRef = useRef(null);

  const [formChangePass, setFormChangePass] = useState({
    email: "",
    oldPass: "",
    newPass: "",
    confirmPass: ""
  });

  const currentUser = userProfile;

  const [formData, setFormData] = useState({
    nama: "",
    location: "Bandung, Indonesia",
    bio: "Lorem ipsum dolor sit amet...",
    avatar: null,
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        nama: currentUser.name || currentUser.nama || "",
        location: currentUser.location || "Bandung, Indonesia",
        bio: currentUser.bio || "Lorem ipsum dolor sit amet...",
        avatar: currentUser.avatar_url || currentUser.avatar || null,
      });

      setFormChangePass((prev) => ({
        ...prev,
        email: currentUser.email || ""
      }));
    }
  }, [currentUser]);

  // guard: session/persist belum siap
  if (!session?.email) {
    return null; // atau loading skeleton
  }

  // Guard 2: Jika data userProfile masih diproses / null, tampilkan loading agar tidak crash
  if (!currentUser || isPending) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePass = (e) => {
    const { name, value } = e.target;
      setFormChangePass({...formChangePass, [name]: value});
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(
        updateProfileThunk({
          userEmail: currentUser.email,
          name: formData.nama,
          img: formData.avatar,
        })
      ).unwrap();
      setIsModalOpen(false);
      // gak perlu window.location.reload() — redux-persist otomatis nyimpen
      // state baru ke localStorage, dan komponen re-render sendiri karena
      // `users` (dari useSelector) berubah begitu store keupdate.
    } catch (err) {
      alert(err || "Gagal menyimpan perubahan");
    }
  };

  const handleSaveChangePass = async () => {
    try{
      await dispatch(
        resetPasswordThunk({
          newPass: formChangePass.newPass,
          userForgot: currentUser.email,
        })
      ).unwrap();
      setIsModalPassOpen(false);
    }catch(err){
      alert(err || "Failed Change Password");
    }
  }

  return (
    <>
      <ScrollToTop />
      <main className={`w-full flex flex-col gap-6 justify-center items-center sticky top-14 z-40 ${theme === "light" ? "bg-white" : "bg-black"}`}>
        <section className={`w-full max-w-5xl border-b ${theme === "light" ? "border-gray-300" : "border-gray-700"} flex-1 flex flex-col gap-4`}>
          <div className="w-full flex flex-col gap-4 pt-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-orange-400">
                  <img
                    src={currentUser.avatar_url || "/img/img-profile.jpg"}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <h2 className={`text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-300"}`}>
                      {currentUser.name}
                    </h2>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MdOutlineLocationOn />
                      {currentUser.location || "Bandung, Indonesia"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <IoCalendarClearOutline />
                      {convertDate(currentUser.created_at)}
                    </span>
                    <span className="px-4 py-0.5 text-orange-600 font-medium bg-orange-200 text-xs rounded-full capitalize">
                      {role}
                    </span>
                  </div>
                  <div className="flex items-start w-full text-xs text-gray-700 font-medium">
                    {currentUser.bio}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className={`w-40 h-10 rounded-lg flex gap-2 justify-center items-center border ${theme === "light" ? "border-gray-300 text-gray-600 hover:bg-gray-100" : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-900"} text-xs font-medium cursor-pointer`}
                >
                  <FiEdit2 />
                  <span>Edit Profile</span>
                </div>
                <div
                  onClick={() => setIsModalPassOpen(true)}
                  className={`w-40 h-10 rounded-lg flex gap-2 justify-center bg-orange-600 items-center border ${theme === "light" ? "border-gray-300 text-gray-100 hover:bg-orange-500" : "border-gray-700 text-gray-200 hover:bg-gray-900"} text-xs font-medium cursor-pointer`}
                >
                  <FiEdit2 />
                  <span>Change Password</span>
                </div>
              </div>
            </div>

            <div className={`flex justify-center items-center ${theme === "light" ? "text-gray-800" : "text-gray-300"}`}>
              <div className="flex-1 flex flex-col justify-center items-center">
                <span className="text-xl font-bold">{myEvents.length ?? 0}</span>
                <span className="text-gray-500 text-[12px] font-medium">Events</span>
              </div>
              <div className={`flex-1 flex flex-col justify-center items-center border-l border-r ${theme === "light" ? "border-gray-300" : "border-gray-700"}`}>
                <span className="text-xl font-bold">{currentUser.community_id?.length ?? 0}</span>
                <span className="text-gray-500 text-[12px] font-medium">Communities</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <span className="text-xl font-bold">{saved_events?.length ?? 0}</span>
                <span className="text-gray-500 text-[12px] font-medium">Saved</span>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-gray-400">
              <NavLink end to="" className={({ isActive }) => `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`}>Events</NavLink>
              <NavLink end to="community" className={({ isActive }) => `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`}>Communities</NavLink>
              <NavLink end to="saved" className={({ isActive }) => `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`}>Saved</NavLink>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center items-center pb-6">
          <Outlet />
        </section>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

          <div className={`relative w-full max-w-md rounded-xl shadow-2xl p-6 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Edit Profile</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><FiX /></button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-3">
                <div className="relative group">
                  <img
                    src={currentUser.avatar_url || "/img/img-profile.jpg"}
                    alt={currentUser.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 p-1.5 bg-gray-800 rounded-full border-2 border-white hover:bg-gray-700"
                  >
                    <FiCamera className="text-white w-3 h-3 cursor-pointer" />
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-xs text-orange-600 font-medium hover:underline cursor-pointer"
                >
                  Upload photo
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Full Name</label>
                <input type="text" name="nama" value={formData.nama} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-800 text-white"}`} />
              </div>

              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-800 text-white"}`} />
              </div>

              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" placeholder="Tell the community a little about yourself..." className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-800 text-white"}`} />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 text-sm rounded-lg font-medium cursor-pointer ${theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 cursor-pointer">Save Changes</button>
            </div>
          </div>
        </div>
      )}
      {isModalPassOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalPassOpen(false)}></div>

          <div className={`relative w-full max-w-md rounded-xl shadow-2xl p-6 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Change Password</h3>
              <button onClick={() => setIsModalPassOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><FiX /></button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Old Password</label>
                <div className="w-full relative flex justify-between">
                  <input type={showOldPass ? "text" : "password"} name="oldPass" value={formChangePass.old} onChange={handleChangePass} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-800 text-white"}`} />
                  <button type="button" onClick={() => setShowOldPass(!showOldPass)} className="absolute right-4 top-2.5 text-gray-400 cursor-pointer focus:outline-none">
                      {showOldPass ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>New Password</label>
                <div className="w-full relative flex justify-between">
                  <input type={showNewPass ? "text" : "password"} name="newPass" value={formChangePass.new} onChange={handleChangePass} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-800 text-white"}`} />
                  <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-4 top-2.5 text-gray-400 cursor-pointer focus:outline-none">
                      {showNewPass ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Confirm Password</label>
                <div className="w-full relative flex justify-between">
                  <input type={showConfPass ? "text" : "password"} name="confPass" value={formChangePass.confirm} onChange={handleChangePass} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-800 text-white"}`} />
                  <button type="button" onClick={() => setShowConfPass(!showConfPass)} className="absolute right-4 top-2.5 text-gray-400 cursor-pointer focus:outline-none">
                      {showConfPass ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalPassOpen(false)} className={`px-4 py-2 text-sm rounded-lg font-medium cursor-pointer ${theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>Cancel</button>
              <button onClick={handleSaveChangePass} className="px-4 py-2 text-sm rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 cursor-pointer">Change Password</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileLayout;