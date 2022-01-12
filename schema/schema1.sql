--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 12.5

-- Started on 2022-01-02 15:12:17

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
-- TOC entry 201 (class 1259 OID 16455)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id bigint NOT NULL,
    country character varying(255),
    description character varying(255),
    duration_min integer,
    name character varying(255),
    release_date timestamp without time zone
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16453)
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO postgres;

--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 200
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- TOC entry 203 (class 1259 OID 16466)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    description character varying(255),
    name character varying(255)
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16464)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 202
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 205 (class 1259 OID 16477)
-- Name: user_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_accounts (
    id bigint NOT NULL,
    username character varying(255),
    created_on timestamp without time zone,
    email character varying(255),
    isactiv boolean,
    forename character varying(255),
    password character varying(255),
    surname character varying(255),
    update_on timestamp without time zone
);


ALTER TABLE public.user_accounts OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16475)
-- Name: user_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_accounts_id_seq OWNER TO postgres;

--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_accounts_id_seq OWNED BY public.user_accounts.id;


--
-- TOC entry 206 (class 1259 OID 16486)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16489)
-- Name: users_movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_movies (
    user_id bigint NOT NULL,
    movies_id bigint NOT NULL
);


ALTER TABLE public.users_movies OWNER TO postgres;

--
-- TOC entry 2873 (class 2604 OID 16516)
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- TOC entry 2874 (class 2604 OID 16517)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 2875 (class 2604 OID 16518)
-- Name: user_accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts ALTER COLUMN id SET DEFAULT nextval('public.user_accounts_id_seq'::regclass);



--
-- TOC entry 3046 (class 0 OID 0)
-- Dependencies: 200
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 8, true);


--
-- TOC entry 3047 (class 0 OID 0)
-- Dependencies: 202
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 11, true);


--
-- TOC entry 3048 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_accounts_id_seq', 43, true);


--
-- TOC entry 2877 (class 2606 OID 16463)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- TOC entry 2879 (class 2606 OID 16474)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 2881 (class 2606 OID 16495)
-- Name: user_accounts uk_lxwlgwuy2yrbye2vgs9w9x7mr; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT uk_lxwlgwuy2yrbye2vgs9w9x7mr UNIQUE (username);


--
-- TOC entry 2883 (class 2606 OID 16520)
-- Name: user_accounts user_accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT user_accounts_email_key UNIQUE (email);


--
-- TOC entry 2885 (class 2606 OID 16485)
-- Name: user_accounts user_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT user_accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 2887 (class 2606 OID 16522)
-- Name: user_accounts user_accounts_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_accounts
    ADD CONSTRAINT user_accounts_username_key UNIQUE (username);


--
-- TOC entry 2889 (class 2606 OID 16524)
-- Name: user_roles user_roles_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_product_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 2891 (class 2606 OID 16493)
-- Name: users_movies users_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT users_movies_pkey PRIMARY KEY (user_id, movies_id);


--
-- TOC entry 2897 (class 2606 OID 16511)
-- Name: users_movies fk4hfkjih3i5p3krkoxaowes4ie; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT fk4hfkjih3i5p3krkoxaowes4ie FOREIGN KEY (user_id) REFERENCES public.user_accounts(id);


--
-- TOC entry 2896 (class 2606 OID 16506)
-- Name: users_movies fk4mgf9y515d4ccypkee5onx6dy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT fk4mgf9y515d4ccypkee5onx6dy FOREIGN KEY (movies_id) REFERENCES public.movies(id);


--
-- TOC entry 2893 (class 2606 OID 16501)
-- Name: user_roles fknb9ceyh529oqh9n3aiw68twme; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fknb9ceyh529oqh9n3aiw68twme FOREIGN KEY (user_id) REFERENCES public.user_accounts(id);


--
-- TOC entry 2892 (class 2606 OID 16496)
-- Name: user_roles fkrhfovtciq1l558cw6udg0h0d3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkrhfovtciq1l558cw6udg0h0d3 FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- TOC entry 2894 (class 2606 OID 16525)
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE;


--
-- TOC entry 2895 (class 2606 OID 16530)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2898 (class 2606 OID 16535)
-- Name: users_movies users_movies_movies_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT users_movies_movies_id_fkey FOREIGN KEY (movies_id) REFERENCES public.movies(id) ON UPDATE CASCADE;


--
-- TOC entry 2899 (class 2606 OID 16540)
-- Name: users_movies users_movies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_movies
    ADD CONSTRAINT users_movies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (1, 'Outside the Wire', 'Outside the Wire is a 2021 American science fiction action film directed by Mikael Håfström Outside the Wire is a 2021 American science fiction action film directed by Mikael Håfström ', '2020-01-01', 'USA', 160);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (2, 'Outside the Wire II', 'Outside the Wire is a 2022 American science fiction action film directed by Mikael Håfström Outside the Wire is a 2022 American science fiction action film directed by Mikael Håfström', '2022-02-04', 'USA', 160);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (3, 'Locked Down', 'Locked Down is a 2021 romantic comedy heist film directed by Doug Liman and written by Steven Knight. Locked Down is a 2021 romantic comedy heist film directed by Doug Liman and written by Steven Knight.', '2021-09-01', 'UK', 122);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (4, 'Bliss', 'Bliss is a 2021 American science-fiction drama film written and directed by Mike Cahill. Bliss is a 2021 American science-fiction drama film written and directed by Mike Cahill.', '2021-04-01', 'USA', 91);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (5, 'Bliss II', 'Bliss II is a 2021 American science-fiction drama film written and directed by Mike Cahill. Bliss II is a 2021 American science-fiction drama film written and directed by Mike Cahill.', '2021-06-01', 'USA', 121);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (6, 'Bliss III', 'Bliss III is a 2021 American science-fiction drama film written and directed by Mike Cahill. Bliss III is a 2021 American science-fiction drama film written and directed by Mike Cahill.', '2021-07-03', 'USA', 101);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (7, 'Bliss IV', 'Bliss IV is a 2022 American science-fiction drama film written and directed by Mike Cahill. Bliss IV is a 2022 American science-fiction drama film written and directed by Mike Cahill.', '2022-07-03', 'USA', 88);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (8, 'Locked Down II', 'Locked Down II is a 2022 romantic comedy heist film directed by Doug Liman and written by Steven Knight. Locked Down II is a 2022 romantic comedy heist film directed by Doug Liman and written by Steven Knight.', '2022-03-01', 'UK', 122);

INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (9, 'The 355', 'Named after a female spy during the Revolutionary War, The 355 follows a group of international agents — all women — who band together to track down a dangerous mercenary with a powerful weapon. The cast brings together a set of amazing actresses, including Jessica Chastain, Lupita Nyongo, Diane Kruger, Penelope Cruz and Fan Bingbing.', '2022-01-12', 'USA', 122);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (10, 'Moonfall', 'Director Roland Emmerich, master of the art of the disaster epic (see: Independence Day, Godzilla, The Day After Tomorrow, 2012 etc.), takes on a catastrophe on a galactic scale: The moon gets knocked out of orbit and comes hurtling towards Earth. Can a ragtag team of scientists save the planet in time?', '2022-02-03', 'UK', 122);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (11, 'The Batmam', 'A Dark Knights work is never done. This time, Robert Pattinson takes up the cowl for a movie directed by Cloverfields Matt Reeves. This one goes back to Batmans early years in Gotham City, and his first run-in with the Riddler.', '2022-03-06', 'USA', 155);
INSERT INTO public.movies (id, name, description, release_date, country, duration_min) VALUES (12, 'Petite Maman', 'Among the high-decibel blockbusters that touched down at the end of 2021 arrived Petite Maman: a French film so quiet and delicate that it made you lean forward in your chair, rather than being blasted back into it. The strangest of confections, its part high-concept time-travel yarn, part meditation on grief, part kids adventure — and all enchanting. Young Nelly (Joséphine Sanz) is helping her mother (Nina Meurisse) sort out the effects of her grandmothers home — Grandma has just died in a care home — when she comes across another small girl, who it turns out is Nellys mum, somehow transported back to childhood. ', '2022-03-01', 'UK', 122);

-- Completed on 2022-01-02 15:12:17

--
-- PostgreSQL database dump complete
--


