import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useRouter } from 'next/router';

const leftToRightAnimation: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Transition: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <div className="overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={asPath}
          variants={leftToRightAnimation}
          animate="animate"
          initial="initial"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
