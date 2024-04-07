import ArrowLeftIcon from "@/src/assets/icons/arrowleft-icon.svg";
import CheckIcon from "@/src/assets/icons/check-icon.svg";
import PlusIcon from "@/src/assets/icons/plus-icon.svg";

interface IconButton {
  type?: "back" | "success" | "plus";
  onClick?: () => void;
  width?: number;
}

export default function IconButton({
  type = "back",
  onClick,
  width = 24,
}: IconButton) {
  switch (type) {
    case "success":
      return <Success width={width} onClick={onClick} />;
    case "plus":
      return <Plus width={width} onClick={onClick} />;
    default:
      return <Back width={width} onClick={onClick} />;
  }
}

function Back({ width, onClick }: IconButton) {
  return (
    <button
      className={`icon-button status-primary-line`}
      style={{ width, height: width }}
      onClick={onClick}
    >
      <ArrowLeftIcon
        width={width! * 0.8}
        height={width! * 0.8}
        stroke="#FCD34D"
      />
    </button>
  );
}

function Success({ width, onClick }: IconButton) {
  return (
    <button
      className={`icon-button status-success-fill`}
      style={{ width, height: width }}
      onClick={onClick}
    >
      <CheckIcon width={width! * 0.8} height={width! * 0.8} fill="#ffffff" />
    </button>
  );
}

function Plus({ width, onClick }: IconButton) {
  return (
    <button
      className={`icon-button status-primary-fill`}
      style={{ width, height: width }}
      onClick={onClick}
    >
      <PlusIcon width={width! * 0.8} height={width! * 0.8} stroke="#ffffff" />
    </button>
  );
}
