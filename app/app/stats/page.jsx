"use client"

import { useEffect, useRef, useState } from 'react';
import PlotComponent from '../_components/PlotComponent/PlotComponent';
import { getActivityPerDate } from '../_libs/userData';
import { checkForSuccess } from '../_libs/ApiClient';
import Placeholder from '../_components/Placeholder/Placeholder';
import Streak from '../_components/Streak/Streak';
import { timeSeries } from '../_libs/TimeSeries';
import ConsistencyDisplay from '../_components/ConsistencyDisplay/ConsistencyDisplay';
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

  // Calculate % of days with logged activity
  const firstSession = activityArray[activityArray.length - 1].date;
  const daysFromFirstSession = timeSeries.daysSince(firstSession);
  const interval = daysFromFirstSession;


  const scrollDiv = scrollRef.current;
  if (scrollDiv) {
    // Set the scrollbar to be on the far right by default
    scrollDiv.scrollLeft = scrollDiv.scrollWidth - scrollDiv.clientWidth
  }

  return (
    <>
      <h1>Check out how you're doing!</h1>
      <section className='responsive-section'>
        <PlotComponent activityArray={activityArray} />
        <div className='responsive-column--50'>
          <ConsistencyDisplay
            activityArray={activityArray}
            firstSession={firstSession}
          />
          <div
            className="streak--scroll"
            ref={scrollRef}
          >
            <Streak
              data={activityArray}
              interval={interval}
            />
          </div>

        </div>
      </section>
      
    </>
  )
}

export default Stats
