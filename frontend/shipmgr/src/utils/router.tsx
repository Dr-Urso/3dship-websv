
import App from "../App.tsx";
import ImportGltf from "../components/importGltf.tsx";
import PartOverview from "../components/partOverview.tsx";
import {createHashRouter} from "react-router-dom";

const router = createHashRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path:"/gltf",
                element: <ImportGltf></ImportGltf>,
            },
            {
                path: "/chart",
                element: <PartOverview></PartOverview>,
            },
        ]
    },
]);

export default router;