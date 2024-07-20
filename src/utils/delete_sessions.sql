-- Active: 1718904400861@@127.0.0.1@3306@movement_snack

delete from 
  session
where 
  DATE(created_time) = CURDATE()