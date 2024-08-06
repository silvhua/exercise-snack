# Step 1: Create the database using the create-db-template.sql script
# Step 2: backup the database
mysqldump --no-tablespaces -h p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com -u tv2fmuctqs6tvkh1 -pi5elts4t7ntwjenk x1hjx1v9umhyyo0i > backup.sql

# Step 3: restore the database
mysql -h 127.0.0.1 -u root -prootroot backup_20240805 < backup.sql

