import { Link, useNavigate } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";

interface BackButtonProps {
  label: string;
  to?: string; // sem `to`, volta para a página anterior do histórico
  className?: string;
}

const baseClass = `flex items-center gap-2 w-fit whitespace-nowrap text-color-silver-2 hover:text-color-white
  border border-color-silver-1 rounded-lg px-4 py-2 hover:bg-white/10 transition-all duration-300 cursor-pointer`;

export const BackButton = ({ label, to, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  const content = (
    <>
      <IoIosReturnLeft size={20} /> {label}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClass} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`${baseClass} ${className}`}
    >
      {content}
    </button>
  );
};
