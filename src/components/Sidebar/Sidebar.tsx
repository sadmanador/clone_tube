import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import React, { useContext } from "react";
import Image from "next/image";

const Sidebar = () => {
  const { sidebar, category, setCategory } = useContext(SidebarToggleContext);


  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        <div
          className={`side-link ${category === 0 ? "active" : ""}`}
          onClick={() => setCategory(0)}
        >
          <Image width={25} height={25} src="/assets/home.png" alt="Menu" />
          <p>Home</p>
        </div>
        <div
          className={`side-link ${category === 20 ? "active" : ""}`}
          onClick={() => setCategory(20)}
        >
          <Image
            width={25}
            height={25}
            src="/assets/game_icon.png"
            alt="Gaming"
          />
          <p>Gaming</p>
        </div>
        <div
          className={`side-link ${category === 2 ? "active" : ""}`}
          onClick={() => setCategory(2)}
        >
          <Image
            width={25}
            height={25}
            src="/assets/automobiles.png"
            alt="Automobiles"
          />
          <p>Automobiles</p>
        </div>
        <div
          className={`side-link ${category === 17 ? "active" : ""}`}
          onClick={() => setCategory(17)}
        >
          <Image width={25} height={25} src="/assets/sports.png" alt="Sports" />
          <p>Sports</p>
        </div>
        <div
          className={`side-link ${category === 24 ? "active" : ""}`}
          onClick={() => setCategory(24)}
        >
          <Image
            width={25}
            height={25}
            src="/assets/entertainment.png"
            alt="Entertainment"
          />
          <p>Entertainment</p>
        </div>
        <div
          className={`side-link ${category === 28 ? "active" : ""}`}
          onClick={() => setCategory(28)}
        >
          <Image
            width={25}
            height={25}
            src="/assets/tech.png"
            alt="Technology"
          />
          <p>Technology</p>
        </div>
        <div
          className={`side-link ${category === 10 ? "active" : ""}`}
          onClick={() => setCategory(10)}
        >
          <Image width={25} height={25} src="/assets/music.png" alt="Music" />
          <p>Music</p>
        </div>
        <div
          className={`side-link ${category === 22 ? "active" : ""}`}
          onClick={() => setCategory(22)}
        >
          <Image width={25} height={25} src="/assets/blogs.png" alt="Blogs" />
          <p>Blogs</p>
        </div>
        <div
          className={`side-link ${category === 25 ? "active" : ""}`}
          onClick={() => setCategory(25)}
        >
          <Image width={25} height={25} src="/assets/news.png" alt="News" />
          <p>News</p>
        </div>
        <hr />
      </div>
      <div className="subscribed-list">
        <h3>Subscribed</h3>
        <div className="side-link">
          <Image
            width={25}
            height={25}
            src="/assets/jack.png"
            alt="PewDiePie"
          />
          <p>PewDiePie</p>
        </div>
        <div className="side-link">
          <Image width={25} height={25} src="/assets/simon.png" alt="MrBeast" />
          <p>MrBeast</p>
        </div>
        <div className="side-link">
          <Image
            width={25}
            height={25}
            src="/assets/tom.png"
            alt="Justin Bieber"
          />
          <p>Justin Bieber</p>
        </div>
        <div className="side-link">
          <Image
            width={25}
            height={25}
            src="/assets/megan.png"
            alt="5-Minute Crafts"
          />
          <p>5-Minute Crafts</p>
        </div>
        <div className="side-link">
          <Image
            width={25}
            height={25}
            src="/assets/cameron.png"
            alt="Nas Daily"
          />
          <p>Nas Daily</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
