"use client"

import { useEffect, useRef, useState } from 'react';
import PlotComponent from '../_components/PlotComponent/PlotComponent';
import { getActivityPerDate } from '../_libs/userData';
import { checkForSuccess } from '../_libs/ApiClient';
import Placeholder from '../_components/Placeholder/Placeholder';
import Streak from '../_components/Streak/Streak';
// import './Stats.scss';

const Stats = () => {
  const scrollRef = useRef(null);
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
  const scrollDiv = scrollRef.current;
  if (scrollDiv) {
    // Set the scrollbar to be on the far right by default
    scrollDiv.scrollLeft = scrollDiv.scrollWidth - scrollDiv.clientWidth
  }

  return (
    <>
      <h1>Data</h1>
      <section className='responsive-section'>
        <PlotComponent activityArray={activityArray} />
        <div
          className="streak--scroll responsive-column--50"
          ref={scrollRef}
        >
          <Streak
            data={activityArray}
          />
        </div>
      </section>
      
    </>
  )
}

export default Stats
