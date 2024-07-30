-- Active: 1722208912296@@p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com@3306@x1hjx1v9umhyyo0i
SELECT * FROM information_schema.processlist;

SHOW PROCESSLIST;

SELECT CONCAT('KILL ', id, ';') 
FROM information_schema.processlist 
WHERE user != 'system_user' AND id != CONNECTION_ID();
-- After running this query, copy, paste, and run the resulting `KILL <process_id>` commands.


KILL 1555016;
KILL 1555017;
KILL 1555010;
KILL 1554987;
KILL 1554966;
KILL 1554967;