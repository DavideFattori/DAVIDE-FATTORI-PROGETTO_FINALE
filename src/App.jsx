import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import Navbar from "./components/Navbar";


function App() {
  
  return (
    <>  
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

function Root() {
  return <App />
}

export default Root;

