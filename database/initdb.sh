cp /tmp/pg_hba.conf /var/lib/postgresql/data/pg_hba.conf
psql -f /tmp/init.sql
psql -c "ALTER USER sb3api WITH ENCRYPTED PASSWORD 'sb3api';"
