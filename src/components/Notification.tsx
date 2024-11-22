import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

const Notification = () => {
  return (
    <div>
        <ToastContainer toastStyle={{ background: "black", color: "white" }} position="bottom-right" />
    </div>
  )
}

export default Notification