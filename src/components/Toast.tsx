import { render, unmountComponentAtNode } from "react-dom";
import { motion } from "framer-motion";

type NotifyKind = "success" | "error" | "info" | "warn";

interface ToastProps {
  message: string;
  duration: number;
}

const ToastComponent: React.FC<ToastProps> = ({ message }) => {
  return (
    <motion.div
      className="fixed inset-x-0 top-4 mx-auto max-w-sm rounded-md bg-gray-200/95 p-2 shadow-lg"
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
    >
      <p className="flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-gray-900">
        {message}
      </p>
    </motion.div>
  );
};

class Toast {
  private static isToastOpen = false;
  private static toastTimeout: NodeJS.Timeout | null = null;

  static removeToast() {
    unmountComponentAtNode(document.getElementById("toast") as Element);
    Toast.isToastOpen = false;

    if (Toast.toastTimeout) {
      clearTimeout(Toast.toastTimeout);
      Toast.toastTimeout = null;
    }
  }

  static notify(props: ToastProps) {
    if (Toast.isToastOpen) {
      Toast.removeToast();
    }

    Toast.isToastOpen = true;
    render(<ToastComponent {...props} />, document.getElementById("toast"));

    Toast.toastTimeout = setTimeout(() => {
      Toast.removeToast();
    }, props.duration);
  }
}

export default Toast;
