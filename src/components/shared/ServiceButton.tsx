type Props = React.HTMLAttributes<HTMLButtonElement>;

const ServiceButton: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={`mt-auto rounded-lg bg-gradient-to-r p-1 text-xs font-bold text-white hover:cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ServiceButton;
