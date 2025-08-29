import { motion } from "motion/react";
import { forwardRef } from "react";
import useMeasure from "react-use-measure";

export interface MeasuredContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const MeasuredContainer = forwardRef<
  HTMLDivElement,
  MeasuredContainerProps
>(({ ...props }, forwardedRef) => {
  const [measureRef, bounds] = useMeasure();

  return (
    <motion.div
      ref={forwardedRef}
      initial={false}
      animate={{
        width: bounds.width > 10 ? bounds.width : "auto",
        height: bounds.height > 10 ? bounds.height : "auto",
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        delay: 0.01,
      }}
    >
      <div ref={measureRef} {...props} />
    </motion.div>
  );
});

MeasuredContainer.displayName = "MeasuredContainer";
