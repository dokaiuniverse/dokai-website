import Header from "@components/layout/Header/Header";

const NoFooterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "11.5rem",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default NoFooterLayout;
