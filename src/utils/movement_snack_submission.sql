-- Active: 1721180328641@@127.0.0.1@3306@movement_snack_submission

delete from 
  session
where 
  DATE(created_time) >= CURDATE() - INTERVAL 1 DAY

delete from 
  session 
where 
  created_time = CURRENT_DATE()