import Image from "next/image";

export default function Icon({
  type,
  status = "default",
  alt,
  size,
  style,
}: Icon) {
  return (
    <Image
      src={`/icons/${type}-icon-${status}.svg`}
      width={size || 24}
      height={size || 24}
      alt={alt}
      style={style}
    />
  );
}
