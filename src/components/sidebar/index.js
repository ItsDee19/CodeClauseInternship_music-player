import React, { useState, useEffect } from 'react';
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { AiFillHome } from "react-icons/ai";
import { TbMusicSearch } from "react-icons/tb";
import { FcLike } from "react-icons/fc";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { PiSignOutBold } from "react-icons/pi";
import apiClient from '../../spotify';

function Sidebar({ handleSignOut }) {
  const [image, setImage] = useState("https://res.cloudinary.com/dgqnhhjgo/image/upload/v1709536846/profile-image_xrlmoc.jpg");

  useEffect(() => {
    apiClient.get("me")
      .then(response => {
        if (response.data && response.data.images && response.data.images.length > 0) {
          setImage(response.data.images[0].url);
        } else {
          setImage("https://example.com/default-profile-image.jpg");
          console.error("No profile image found for the user");
        }
      })
      .catch(error => {
        console.error("Error fetching profile image:", error);
      });
  }, []);

  return (
    <div className='sidebar-container'>
      <img src={image}
        className='profile-img'
        alt='profile'
      />
      <div>
        <SidebarButton title="Player" to="/player" icon={<TbPlayerPlayFilled />} />
        <SidebarButton title="Home" to="/" icon={<AiFillHome />} />
        <SidebarButton title="Feed" to="/feed" icon={<TbMusicSearch />} />
        <SidebarButton title="Liked" to="/liked" icon={<FcLike />} />
      </div>
      <button className="sidebar-signout" onClick={handleSignOut}>
        <PiSignOutBold />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default Sidebar;

