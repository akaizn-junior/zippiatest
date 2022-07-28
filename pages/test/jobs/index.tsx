import { useState } from 'react'
import Head from 'next/head'

import styles from '../../../styles/Jobs.module.css'

import type { NextPage } from 'next'
import type { JobsApiResponse, Job } from '../../../types/Job'

import { getCompanyNames, filterByCompanyName, filter7DaysPubbed } from '../../../helpers/job'

import Card from '../../../components/Card/Card'
import Portal from '../../../components/Portal/Portal'

/**
 * This component renders a grid of jobs with minimal details
 * and offers some basic filters
*/
const Jobs: NextPage = (props: any) => {
  const { data } : { data: JobsApiResponse } = props

  const [showNames, setShowNames] = useState(false)

  const firstTenJobs = data.jobs.slice(0, 10)
  const [jobs, setJobs] = useState(firstTenJobs)
  const [nameInput, setNameInput] = useState('')

  const [companyNames] = useState(getCompanyNames(data.jobs))

  return (
    <>
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
              <div id="company-name-select">
                <input
                  style={{ zIndex: 3 }}
                  type="search"
                  placeholder='Company name'
                  value={nameInput}
                  onClick={() => setShowNames(true)}
                  onInput={e => {
                    // @ts-ignore-line
                    const value = e.target.value;
                    const res = filterByCompanyName(value, data.jobs)
                    setJobs(res)
                    setShowNames(false)
                    setNameInput('')
                  }}
                />
                <Portal
                  open={showNames}
                  parent="#company-name-select"
                  onClick={() => setShowNames(false)}
                >
                  <div className={styles.companyNames}>
                    {companyNames.map((nm: string, i: number) =>
                      <button
                        type="button"
                        key={i}
                        data-value={nm}
                        onClick={e => {
                          // @ts-ignore-line
                          const value = e.target.dataset.value
                          const res = filterByCompanyName(value, data.jobs)
                          setNameInput(value)
                          setJobs(res)
                        }}
                      >{nm}</button>
                    )}
                  </div>
                </Portal>
              </div>
            </div>
            <div className={styles.filter}>
              <p>Published in the last 7 days</p>
              <div>
                <button
                  type="button"
                  className={styles.filterNewButton}
                  onClick={() => {
                    const res = filter7DaysPubbed(data.jobs)
                    setJobs(res)
                  }}
                >
                  Most recent
                </button>
                <button
                  type="button"
                  className={styles.filterNewButton}
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
    </>
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
