import React from "react";
import css from "./dashboard.module.css"
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import Footer from "@/components/footer/footer";
import MainSection from "@/components/mainSection/mainSection"
export default function dashBoard() {
    const [sideBarActive, setsideBarActive] = React.useState<boolean>(false);
    const [option, setOption] = React.useState<Number>(2)
    /*
        option : 1 -> profile page 
        option : 2 -> buy (default page)
        option : 3 -> sell
    */
    return (
        <div className={css["dashboard-root"]}>
            <Navbar sideBarActive = {sideBarActive} setsideBarActive = {setsideBarActive} />
            {sideBarActive && <Sidebar option={option} setOption={setOption} setsideBarActive={setsideBarActive} />}
            <MainSection option={option}/>
            <Footer />
        </div>
    )
}