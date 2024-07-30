-- Active: 1722208912296@@p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com@3306@x1hjx1v9umhyyo0i
SELECT * FROM information_schema.processlist;

SHOW PROCESSLIST;

SELECT CONCAT('KILL ', id, ';') 
FROM information_schema.processlist 
WHERE user != 'system_user' AND id != CONNECTION_ID();
-- After running this query, copy, paste, and run the resulting `KILL <process_id>` commands.


KILL 1554672;
KILL 1554648;
KILL 1554673;
KILL 1554649;
KILL 1554130;