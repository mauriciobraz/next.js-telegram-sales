type Props = React.HTMLAttributes<HTMLButtonElement>;

const ServiceButton: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={`mt-auto px-2 py-0.5 rounded-lg bg-gradient-to-r text-sm text-white font-bold hover:cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ServiceButton;
