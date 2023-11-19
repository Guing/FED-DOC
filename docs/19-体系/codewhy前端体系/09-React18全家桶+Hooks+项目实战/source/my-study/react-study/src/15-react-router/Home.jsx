import React, { PureComponent } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { withRouter } from "./hoc/with_router";
export class Home extends PureComponent {
  render() {
    return (
      <div>
        <div className="header">
          header
          <ul className="nav">
            <li>
              <Link to="/list">列表 </Link>
            </li>
            <li>
              <Link to="/detail">详情 </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          {/* <Routes>
            <Route path="/list/:id" element={<List></List>}></Route>
            <Route path="/detail" element={<Detail></Detail>}>
              <Route path="/detail/context" element={<DetailContext />}></Route>
              <Route path="/detail/side" element={<DetailSide />}></Route>
            </Route>
          </Routes> */}
          {this.props.router.routesCpn}
        </div>
        <div className="footer">footer</div>
      </div>
    );
  }
}

export default withRouter(Home);
