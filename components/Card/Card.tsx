import styles from './Card.module.css'

import type { Job } from '../../types/Job'

const Card = (props: any) => {
  const { job }: { job: Job } = props;

  return (
    <div className={styles.card}>
    <p className={styles.jobTitle}>{job.jobTitle}</p>
    <p className={styles.companyName}>{job.companyName}</p>
    <p className={styles.pubDate}>
      {job.showNewJobBedge && <span>New</span>}
      {job.postedDate}
    </p>
  </div>
  )
}

export default Card
