import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";

export default function Navbar() {
    const [user] = useAuthState(auth)
    return (
        <div className="sticky top-0 z-40 border-b bg-slate-50/60 backdrop-blur-2xl transition-colors duration-500 ">
            <div className="navbar  flex justify-between">
                <div className="">
                    <Link to="/" className="font-bold text-xl">Notes</Link>
                </div>
                <div className="navbar-end">
                    <input type="search" className="input input-bordered w-1/2 bg-slate-50/60" placeholder="Search..." />
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || ''} alt="people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-slate-50/60 rounded-box w-52">
                            <li>
                                <Link to="/profile" className="">Profile</Link>
                            </li>
                            <li>
                                <button>Sign out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
