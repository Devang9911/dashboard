// ui/ContainerSpinner.tsx
type ContainerSpinnerProps = {
  size?: number;
};

export default function ContainerSpinner({ size = 32 }: ContainerSpinnerProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
