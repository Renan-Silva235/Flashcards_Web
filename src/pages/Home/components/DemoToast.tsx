interface DemoToastProps {
  message: string;
  visible: boolean;
  progress: number; // 0 a 1, quanto do autoClose já passou
}

// Imita o toast de sucesso do react-toastify (theme="light") usado no app
export const DemoToast = ({ message, visible, progress }: DemoToastProps) => {
  return (
    <div
      className={`absolute top-3 right-3 w-52 rounded-md bg-white shadow-lg overflow-hidden transition-all duration-500 z-20 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-60"
      }`}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="w-4 h-4 rounded-full bg-[#07bc0c] text-white text-[10px] flex items-center justify-center shrink-0">
          ✓
        </span>
        <span className="text-[11px] text-[#757575]">{message}</span>
      </div>
      <div
        className="h-1 bg-[#07bc0c] transition-all duration-100 ease-linear"
        style={{ width: `${(1 - progress) * 100}%` }}
      />
    </div>
  );
};
