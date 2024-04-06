import ArrowLeftIcon from "@/src/assets/icons/arrowleft-icon.svg";
import CheckIcon from "@/src/assets/icons/check-icon.svg";

interface IconButton {
  type?: "back" | "success";
  onClick?: () => void;
}

export default function IconButton({ type = "back", onClick }: IconButton) {
  switch (type) {
    case "success":
      return <Success onClick={onClick} />;
    default:
      return <Back onClick={onClick} />;
  }
}

function Back({ onClick }: IconButton) {
  return (
    <button className={`icon-button status-primary-line`} onClick={onClick}>
      <ArrowLeftIcon stroke="#FCD34D" />
    </button>
  );
}

function Success({ onClick }: IconButton) {
  return (
    <button
      className={`icon-button status-success-fill border-none`}
      onClick={onClick}
    >
      <CheckIcon fill="#ffffff" />
    </button>
  );
}
