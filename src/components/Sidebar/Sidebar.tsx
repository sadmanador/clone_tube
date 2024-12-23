import { SidebarToggleContext } from "@/context/SidebarContext/SidebarContext";
import React, { useContext } from "react";
import Image from "next/image";
import { MenuItems, Subscriptions } from "@/utils/sidebar_options";

const Sidebar = () => {
  const { sidebar, category, setCategory } = useContext(SidebarToggleContext);

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        {MenuItems.map((item) => (
          <div
            key={item.id}
            className={`side-link side-menu ${category === item.id ? "active" : ""}`}
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
      </div>
    </div>
  );
};

export default Sidebar;
