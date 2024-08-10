const Header = ({ projectTitle }: { projectTitle: string }) => {
  return (
    <div className="flex justify-between py-6 sticky left-0 top-0">
      <h1 className="text-xl font-semibold">{projectTitle}</h1>
      <div className="flex items-center gap-x-3"></div>
    </div>
  );
};

export default Header;
