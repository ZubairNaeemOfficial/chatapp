import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllChats } from "../apicalls/chats";
import { GetAllUsers, GetCurrentUser } from "../apicalls/users";
import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { SetAllUsers, SetUser, SetAllChats } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoader());
      const response = await GetCurrentUser();
      const allUsersResponse = await GetAllUsers();
      const allChatsResponse = await GetAllChats();
      dispatch(HideLoader());
      if (response.success) {
        dispatch(SetUser(response.data));
        dispatch(SetAllUsers(allUsersResponse.data));
        dispatch(SetAllChats(allChatsResponse.data));
      } else {
        toast.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
      <div className="flex justify-between p-5 bg-primary rounded">
        <div className="flex items-center gap-1">
          <i className="ri-message-3-line text-2xl text-white"></i>
          <h1
            className="text-white text-2xl uppercase font-bold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            CHAT
          </h1>
        </div>
        <div className="flex gap-2 text-md items-center bg-white p-2 rounded">
          <h1 className=" text-primary cursor-pointer">{user?.name}</h1>

          <i
            class="ri-logout-circle-r-line ml-5 text-xl cursor-pointer text-primary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          ></i>
        </div>
      </div>

      <div className="py-5">{children}</div>
    </div>
  );
}

export default ProtectedRoute;
