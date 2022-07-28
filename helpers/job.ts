import type { Job, PubDateSortType } from '../types/Job'

/** simply compare a value given to the one read from company name */
export const filterByCompanyName = (query: string, jobs: Job[]) => {
  const normalize = (s: string) => s.toLocaleLowerCase();

  const found = jobs.filter((job: Job) => {
    const val = job.companyName;
    const v = normalize(val);
    return v.includes(normalize(query));
  });

  return found;
};

/** Calculate the difference between pub date and today */
const getDateDiff = (pubDate: Date) => {
  const dayInMilliseconds = 24 * 3600 * 1000;
  const today = new Date()
  const normalize = (x: number) => Math.abs(Math.floor(x))
  const diff = normalize((today.getTime() - pubDate.getTime()) / dayInMilliseconds)
  return diff;
}

/** is the pub date between 7 days */
const is7DaysPubbed = (d: Date) => getDateDiff(new Date(d)) <= 7

/** filter pub date within 7 days */
export const filter7DaysPubbed = (jobs: Job[], type: PubDateSortType = 'most') => {
  const found = jobs.filter((job: Job) => {
    const pubDate = new Date(job.postingDate);
    return is7DaysPubbed(pubDate)
  })
    .sort((a: Job, b: Job) => {
      const aDiff = getDateDiff(new Date(a.postingDate))
      const bDiff = getDateDiff(new Date(b.postingDate))
      const proper = type === 'most' ? aDiff - bDiff
        : type === 'least' ? bDiff - aDiff : 0;

      return proper;
    });

  return found;
};

/** create a list of company names */
export const getCompanyNames = (jobs: Job[]) => {
  return jobs.map(j => j.companyName)
}
