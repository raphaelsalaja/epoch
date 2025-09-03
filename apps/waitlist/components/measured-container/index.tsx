import { motion } from "motion/react";
import { forwardRef } from "react";
import useMeasure from "react-use-measure";

export interface MeasuredContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  height?: boolean;
  width?: boolean;
}

export const MeasuredContainer = forwardRef<
  HTMLDivElement,
  MeasuredContainerProps
>(({ height = true, width = false, ...props }, forwardedRef) => {
  const [measureRef, bounds] = useMeasure();

  const shouldMeasureWidth = width ?? true;
  const shouldMeasureHeight = height ?? true;

  const measuredStyles = {
    width: shouldMeasureWidth && bounds.width > 10 ? bounds.width : "auto",
    height: shouldMeasureHeight && bounds.height > 10 ? bounds.height : "auto",
  };

  return (
    <motion.div
      ref={forwardedRef}
      initial={{ width: "auto" }}
      animate={measuredStyles}
      transition={{
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        delay: 0.04,
      }}
    >
      <div ref={measureRef} {...props} />
    </motion.div>
  );
});

MeasuredContainer.displayName = "MeasuredContainer";
