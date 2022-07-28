export interface Job {
  jobTitle: string,
  companyName: string,
  jobDescription: string,
  postingDate: Date,
  postedDate: string,
  showNewJobBedge: boolean
}

export interface JobsApiResponse {
  jobs: Job[],
  totalJobs: number
}

export type PubDateSortType = 'most' | 'least'
