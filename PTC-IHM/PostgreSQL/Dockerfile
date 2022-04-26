FROM postgres:14

# DB Port
ENV PORT=5432
EXPOSE 5432

COPY /PostgreSQL/src/ /var/lib/postgresql/data/

WORKDIR /var/lib/postgresql/data/

#RUN sed -i '/^local/s/peer/trust/' /var/lib/postgresql/data/pg_hba.conf
#RUN sed -i '/^host/s/ident/md5/' /var/lib/postgresql/data/pg_hba.conf