import React, { useState } from "react";
import Sidebar from "./SideBar";
import Blog from "./Blog";
import Books from './Books';
import Discussion from './Discussion';
import BookClubs from './BookClubs';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <div className="relative min-h-screen md:flex">
      {/* sidemenu */}
      <Sidebar setExpand={setSideMenuIsExpand} />
      {/* content */}
      <div
        className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
        }`}
      >
            <div className="flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out md:ml-72">
          <Switch>
            <Route path="/bookClubs">
              <BookClubs />
            </Route>
            <Route path="/discussion">
              <Discussion />
            </Route>
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/">
              <Blog />
            </Route>
          </Switch>
        </div>
      </div>
    </div>

    // <div className="bg-slate-50">
    //   <div className="relative w-full max-w-7xl mx-auto md:flex">
    //     {/* sidemenu */}
    //     <Sidebar setExpand={setSideMenuIsExpand} />
    //     {/* content */}
    //     <div
    //       className={`flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out`}
    //     >
    //       <Blog />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
