import { Chevron, Customise, Details, Waitlist } from "../icons";
import styles from "./styles.module.css";

export function Breadcrumbs() {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumb}>
        <Waitlist />
        <div>Waitlist</div>
      </div>
      <Chevron className={styles.chevron} />
      <div className={styles.breadcrumb}>
        <Details />
        <div>Details</div>
      </div>
      <Chevron className={styles.chevron} />
      <div className={styles.breadcrumb}>
        <Customise />
        <div>Customise</div>
      </div>
    </div>
  );
}
