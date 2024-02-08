
import './App.css'
import {ProLayout} from "@ant-design/pro-components";
import  {menuDataRender} from "./utils/layoutMenu.tsx";
import {Link, Outlet} from "react-router-dom";

function App() {


  return (
    <>
      <div
          id = "main layout"
          style={{height: '100vh',
          }}
          >
          <ProLayout
              menuDataRender={menuDataRender}
              menuItemRender={(menuItemProps, defaultDom) => {
                  if (menuItemProps.isUrl || !menuItemProps.path) {
                      return defaultDom;
                  }
                  // 使用Link组件进行路由跳转
                  return <Link to={menuItemProps.path}>{defaultDom}</Link>;
              }}
              >
                <Outlet/>
          </ProLayout>

      </div>
    </>
  )
}

export default App
