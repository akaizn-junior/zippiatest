import { Fragment, useState } from 'react'
import Head from 'next/head'

import styles from '../../../styles/Jobs.module.css'

import type { NextPage } from 'next'
import type { JobsApiResponse, Job } from '../../../types/Job'

import { filterByCompanyName, filter7DaysPubbed } from './helpers'

import Card from '../../../components/Card/Card'

const Jobs: NextPage = (props: any) => {
  const { data } : { data: JobsApiResponse } = props

  const firstTenJobs = data.jobs.slice(0, 10)
  const [jobs, setJobs] = useState(firstTenJobs)

  return (
    <Fragment>
      <Head>
        <title>Test Jobs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <header>
          <h1>Test Jobs</h1>
          <div className={styles.displaying}>
            Displaying {jobs.length} jobs
          </div>
          <div className={styles.filters}>
            <div className={styles.filter}>
              <p>Company name</p>
              <input
                type="text"
                placeholder='Filter by company name'
                onInput={e => {
                  /* @ts-ignore-line */
                  const val = e.target.value;
                  const res = filterByCompanyName(val, data.jobs)
                  setJobs(res)
                }}
              />
            </div>
            <div className={styles.filter}>
              <p>Published in the last 7 days</p>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const res = filter7DaysPubbed(data.jobs)
                    setJobs(res)
                  }}
                >
                  Most recent
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const res = filter7DaysPubbed(data.jobs, 'least')
                    setJobs(res)
                  }}
                >
                  Least recent
                </button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className={styles.cards}>
          {jobs.map((job: Job, i: number) => <Card key={i} job={job} />)}
          </div>
        </main>
        <footer className={styles.footer}>
          &copy; 2022 Simao Nziaka. Test App for <i>Zippia</i>
        </footer>
      </div>
    </Fragment>
  )
}

export async function getServerSideProps() {
  const resource = process.env.jobsApiEndpoint || ''
  const res = await fetch(resource, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "companySkills": true,
      "dismissedListingHashes": [],
      "fetchJobDesc": true,
      "fetchShortDesc": true,
      "jobTitle": "Business Analyst",
      "locations": [],
      "numJobs": 20,
      "previousListingHashes": []
    })
  })
  const data = await res.json()

  return { props: { data } }
}

export default Jobs
