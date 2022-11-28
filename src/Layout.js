import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <div>Header</div>
            <Outlet/>
            <div>Footer</div>
        </>
    );
}