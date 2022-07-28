import type { Job, PubDateSortType } from '../../../types/Job'

export const filterByCompanyName = (query: string, jobs: Job[]) => {
  const normalize = (s: string) => s.toLocaleLowerCase();

  const found = jobs.filter((job: Job) => {
    const val = job.companyName;
    const v = normalize(val);
    return v.includes(normalize(query));
  });

  return found;
};

const getDateDiff = (pubDate: Date) => {
  const dayInMilliseconds = 24 * 3600 * 1000;
  const today = new Date()
  const normalize = (x: number) => Math.abs(Math.floor(x))
  const diff = normalize((today.getTime() - pubDate.getTime()) / dayInMilliseconds)
  return diff;
}

const is7DaysPubbed = (d: Date) => getDateDiff(new Date(d)) <= 7

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

export const getCompanyNames = (jobs: Job[]) => {
  return jobs.map(j => j.companyName)
}
