const Heading = ({ children, ...props }) => {
  return (
    <h1 className="fs-2 mb-4" {...props}>
      {children}
    </h1>
  );
};

export default Heading;
