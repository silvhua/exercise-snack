-- Active: 1721278614041@@p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com@3306@b0t3n3sme06n80tr

delete from 
  session
where 
  DATE(created_time) = CURDATE();

delete from 
  activity
where 
  DATE(CONVERT_TZ(created_time, '+00:00', 'US/Pacific')) = CURDATE();