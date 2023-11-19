import React from "react";
import Detail from "../pages/Detail";
// import List from "../pages/List";
import DetailContext from "../pages/DetailContext";
import DetailSide from "../pages/DetailSide";
const List = React.lazy(() => import('../pages/List'))
const routes = [
  {
    path: '/list/:id',
    element: <List></List>
  },
  {
    path: '/detail',
    element: <Detail></Detail>,
    children: [
      {
        path: '/detail/context',
        element: <DetailContext></DetailContext>
      },
      {
        path: '/detail/side',
        element: <DetailSide></DetailSide>
      }
    ]
  },

];
export default routes