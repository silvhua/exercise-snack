"use client"
import { useState, useRef, useContext } from "react";
import { DataContext } from "@/app/context-provider";

import ActivityCard from "@/app/_components/ActivityCard/ActivityCard";

const User = () => {
  const context = useContext(DataContext);
  const {
    allActivities
  } = context;

  return (
    <section className="activity-list">
      <h1 className="heading1">
        My Activity History
      </h1>
      {allActivities.map(activity => <ActivityCard
        activityObject={activity}
        key={activity.id} 
      />)}
    </section>
  )
}

export default User
