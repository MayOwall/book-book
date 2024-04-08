import Button from "../atoms/Button";
import IconButton from "../atoms/IconButton";

interface Modal {
  type: "success" | "danger";
  title: string;
  subTitle: string;
  actionContent: string;
  onAction: () => void;
  cancelContent?: string;
  onCancel?: () => void;
}

export default function Modal(props: Modal) {
  const { type } = props;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-[#ffffffbb]">
      {type === "success" && <Success {...props} />}
      {type === "danger" && <Danger {...props} />}
    </div>
  );
}

function Success({ title, subTitle, actionContent, onAction }: Modal) {
  return (
    <div className="z-10 w-80 rounded-lg bg-white p-6 shadow-xl">
      <div className="pointer-events-none mb-2 flex gap-2">
        <span className="text-large-bold text-[theme(colors.success.default)]">
          {title}
        </span>
        <IconButton type="success" width={24} />
      </div>
      <div className="text-medium-regular mb-6 text-[theme(colors.disabled.default)]">
        {subTitle}
      </div>
      <Button size="large" status="success" onClick={onAction}>
        {actionContent}
      </Button>
    </div>
  );
}

function Danger(props: Modal) {
  const { title, subTitle, onAction, actionContent, cancelContent, onCancel } =
    props;
  return (
    <div className="flex w-80 flex-col items-center rounded-xl bg-white p-6 pt-10 shadow-xl">
      <div className="text-large-bold mb-1">{title}</div>
      <div className="text-medium-regular mb-6 text-[theme(colors.disabled.default)]">
        {subTitle}
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <Button size="large" status="danger" onClick={onAction}>
          {actionContent}
        </Button>
        <button className="text-small-regular text-gray-300" onClick={onCancel}>
          {cancelContent}
        </button>
      </div>
    </div>
  );
}
