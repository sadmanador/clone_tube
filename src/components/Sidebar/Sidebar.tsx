import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import { MenuItems, Subscriptions } from "@/utils/sidebar_options";
import Image from "next/image";
import { useContext } from "react";

const Sidebar = () => {
  const { theme, setTheme, sidebar, category, setCategory } =
    useContext(SidebarToggleContext);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "black" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        {MenuItems.map((item) => (
          <div
            key={item.id}
            className={`side-link side-menu ${
              category === item.id ? "active" : ""
            }`}
            onClick={() => setCategory(item.id)}
          >
            <Image width={25} height={25} src={item.icon} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
        <hr />
      </div>

      <div className="subscribed-list">
        <h3>Subscribed</h3>
        {Subscriptions.map((sub) => (
          <div className="side-link" key={sub.name}>
            <Image width={25} height={25} src={sub.icon} alt={sub.name} />
            <p>{sub.name}</p>
            <Image
              width={15}
              height={15}
              src="/assets/streaming.png"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}
              alt={sub.name}
            />
          </div>
        ))}
        <div onClick={toggleTheme} className="flex flex-row items-center side-link">
          <input
            type="checkbox"
            className="toggle toggle-xs mr-2"
            defaultChecked
          />
          <p>
            {theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
