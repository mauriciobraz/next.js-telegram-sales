type Props = React.HTMLAttributes<HTMLButtonElement>;

const ServiceButton: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={`mt-auto rounded-lg bg-gradient-to-r px-2 py-0.5 text-sm font-bold text-white hover:cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ServiceButton;
