const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen py-2">
      {children}
    </div>
  );
};

export default layout;
