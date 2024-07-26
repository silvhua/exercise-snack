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
    <section className="activity-list" key='activity-list'>
      <h1 className="heading1" key='heading'>
        My Activity History
      </h1>
      <ActivityCard />
      {allActivities.map((activity, index) => <ActivityCard
        activityObject={activity}
        key={index}
      />)}
    </section>
  )
}

export default User
