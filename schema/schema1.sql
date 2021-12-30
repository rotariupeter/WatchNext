--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.2

-- Started on 2021-06-19 13:27:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgresql;
--
-- TOC entry 2995 (class 1262 OID 16384)
-- Name: postgresql; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgresql WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgresql OWNER TO postgres;

\connect postgresql

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 24578)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    name character varying(100),
    description character varying(2000),
    release_date date,
    country character varying(50),
    duration_min integer
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24576)
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO postgres;

--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 202
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- TOC entry 2855 (class 2604 OID 24581)
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- TOC entry 2989 (class 0 OID 24578)
-- Dependencies: 203
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (1, 'Outside the Wire', 'Outside the Wire is a 2021 American science fiction action film directed by Mikael Håfström', '2020-01-01', 'USA', 160);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (2, 'Outside the Wire II', 'Outside the Wire is a 2022 American science fiction action film directed by Mikael Håfström', '2022-02-04', 'USA', 160);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (3, 'Locked Down', 'Locked Down is a 2021 romantic comedy heist film directed by Doug Liman and written by Steven Knight.', '2021-09-01', 'UK', 122);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (4, 'Bliss', 'Bliss is a 2021 American science-fiction drama film written and directed by Mike Cahill.', '2021-04-01', 'USA', 91);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (5, 'Bliss II', 'Bliss II is a 2021 American science-fiction drama film written and directed by Mike Cahill.', '2021-06-01', 'USA', 121);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (6, 'Bliss III', 'Bliss III is a 2021 American science-fiction drama film written and directed by Mike Cahill.', '2021-07-03', 'USA', 101);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (7, 'Bliss IV', 'Bliss IV is a 2022 American science-fiction drama film written and directed by Mike Cahill.', '2022-07-03', 'USA', 88);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (8, 'Locked Down II', 'Locked Down II is a 2022 romantic comedy heist film directed by Doug Liman and written by Steven Knight.', '2022-03-01', 'UK', 122);


--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 202
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 8, true);


--
-- TOC entry 2857 (class 2606 OID 24586)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


-- Completed on 2021-06-19 13:27:13

--
-- PostgreSQL database dump complete
--
INSERT INTO public.user_accounts(
	 username, surname, forename, password, email, created_on, last_login, isactiv)
	VALUES ('admin', 'Rotariu', 'Petru','admin', 'rotariupeter@yahoo.com',current_timestamp,current_timestamp , TRUE);
	
	CREATE TABLE users_movies (
 user_id bigint REFERENCES user_accounts (id) ON UPDATE CASCADE ON DELETE CASCADE
, movies_id bigint REFERENCES movies (id) ON UPDATE CASCADE
, isFavorite boolean NOT NULL DEFAULT TRUE
, CONSTRAINT users_movies_pkey PRIMARY KEY (user_id, movies_id)
);

CREATE TABLE user_accounts (
	id serial PRIMARY KEY,drop
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	surname VARCHAR ( 50 ) UNIQUE NOT NULL,
	forename VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 500 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
	isactiv BOOLEAN
);
