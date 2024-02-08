import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import ImportGltf from "../components/importGltf.tsx";
import PartOverview from "../components/partOverview.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path:"/gltf",
                element: <ImportGltf></ImportGltf>,
            },
            {
                path:"/chart",
                element: <PartOverview></PartOverview>,
            },
        ]
    },
]);

export default router;