ALTER
    SESSION SET CONTAINER = FREEPDB1;

CREATE SEQUENCE ticket_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE app.tickets
(
    id          NUMBER(6)   DEFAULT ticket_seq.NEXTVAL PRIMARY KEY,
    title       VARCHAR(200)                     NOT NULL,
    description VARCHAR(1000)                    NOT NULL,
    status      VARCHAR(20) DEFAULT 'TODO'       NOT NULL,
    updated_at  TIMESTAMP   DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE OR REPLACE trigger tickets_set_updated_at
    before UPDATE
    ON tickets
    FOR EACH ROW
begin
    :NEW.updated_at := SYSTIMESTAMP;
end;

/


