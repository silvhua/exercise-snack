-- Active: 1721180328641@@127.0.0.1@3306@movement_snack

delete from 
  session
where 
  DATE(created_time) = CURDATE()