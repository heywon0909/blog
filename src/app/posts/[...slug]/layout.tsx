export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 p-2">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full sm:w-2/3 md:w-1/3 flex flex-col gap-5">{children}</div>
      </div>
    </div>
  );
}
