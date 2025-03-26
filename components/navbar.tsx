export function Navbar() {
  return (
    <div className="navbar max-w-[100rem] mx-auto bg-base-100 shadow-sm rounded-b-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">RechargeBao</a>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
