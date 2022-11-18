type Props = React.SVGProps<SVGSVGElement> & {
  colors: [string, string];
};

const ArrowBackSvg = ({ colors, ...props }: Props) => (
  <svg
    fill="none"
    width="24"
    height="23"
    viewBox="0 0 24 23"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.52337 5.66664H13.6667V7.33331H3.52337L7.99337 11.8033L6.81504 12.9816L0.333374 6.49998L6.81504 0.0183105L7.99337 1.19664L3.52337 5.66664Z"
      fill="url(#paint0_linear_102_718)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_102_718"
        x1="0.333374"
        y1="5.20365"
        x2="10.1733"
        y2="5.39013"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={colors[0]} />
        <stop stopColor={colors[1]} offset="1" />
      </linearGradient>
    </defs>
  </svg>
);

export default ArrowBackSvg;
