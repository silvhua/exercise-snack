"use client"

import { useEffect, useState } from 'react';
import PlotComponent from '../_components/PlotComponent/PlotComponent';
import { getActivityPerDate } from '../_libs/userData';
import { checkForSuccess } from '../_libs/ApiClient';
import Placeholder from '../_components/Placeholder/Placeholder';
import Streak from '../_components/Streak/Streak';
// import './Stats.scss';

const Stats = () => {
  const [activityArray, setActivityArray] = useState(null);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
    const userId = storedUserInfo.id;
    loadActivity(userId);
  }, [])

  async function loadActivity(userId) {
    const activityResponse = await getActivityPerDate(userId);
    if (checkForSuccess(activityResponse)) {
      setActivityArray(activityResponse);
    }
  }
  if (!activityArray) {
    return <Placeholder text="Fetching your data..." />
  }

  return (
    <>
      <h1>Data</h1>
      <section className='responsive-section'>
        <PlotComponent activityArray={activityArray} />
        <div className="flex-column-div">
          <Streak recentSessions={activityArray}/>
        </div>
      </section>
      
    </>
  )
}

export default Stats
