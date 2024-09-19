"use client"

import { useEffect, useRef, useContext } from 'react';
import { DataContext } from "@/app/context-provider";
import PlotComponent from '@/app/_components/PlotComponent/PlotComponent';
import Placeholder from '@/app/_components/Placeholder/Placeholder';
import Streak from '@/app/_components/Streak/Streak';
import { timeSeries } from '@/app/_libs/TimeSeries';
import ConsistencyDisplay from '@/app/_components/ConsistencyDisplay/ConsistencyDisplay';

const Stats = () => {
  const scrollRef = useRef(null);
  const context = useContext(DataContext);
  const { activityArray } = context;

  useEffect(() => {
    // Set the scrollbar to be on the far right by default
    const scrollDiv = scrollRef.current;
    try {
      scrollDiv.scrollLeft = scrollDiv.scrollWidth - scrollDiv.clientWidth;
    } catch (error) { 
    }
  }, [])
  
  if (!activityArray) {
    return <Placeholder text="Fetching your data..." />
  }

  // Calculate % of days with logged activity
  const firstSession = activityArray[activityArray.length - 1].date;
  const daysFromFirstSession = timeSeries.daysSince(firstSession);
  const interval = daysFromFirstSession;

  return (
    <section>
      <h1>Check out how you are doing!</h1>
      <article className='responsive-section'>
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
      </article>
      
    </section>
  )
}

export default Stats
