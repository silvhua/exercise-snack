-- Active: 1722208912296@@p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com@3306@x1hjx1v9umhyyo0i
SELECT * FROM information_schema.processlist;

-- Run this to show how many DB connections there are
SHOW PROCESSLIST;

-- After running this query, copy, paste, and run the resulting `KILL <process_id>` commands.
SELECT CONCAT('KILL ', id, ';') 
FROM information_schema.processlist 
WHERE user != 'system_user';



KILL 1555115;
KILL 1555107;
KILL 1555052;
KILL 1555053;