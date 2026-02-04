type AvatarProps = {
  fullName: string;
  imageUrl?: string;
  size?: number;
};

const DEFAULT_AVATAR =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

export default function Avatar({ fullName, imageUrl, size = 40 }: AvatarProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={imageUrl || DEFAULT_AVATAR}
        alt={fullName}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
      <span className="text-md font-medium text-gray-800">{fullName}</span>
    </div>
  );
}
