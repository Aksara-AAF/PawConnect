--
-- PostgreSQL database dump
--

\restrict OkOGMI2RWpkuuGVXypmEoH4ApHSsp4Ghif1ReMKomhrf2nunTAy79HbYxW822Y2

-- Dumped from database version 17.8 (9c8634e)
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: adoption_requests; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.adoption_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    pet_id uuid NOT NULL,
    adopter_id uuid NOT NULL,
    status character varying(20) DEFAULT 'Menunggu'::character varying,
    application_reason text NOT NULL,
    request_date timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT adoption_requests_status_check CHECK (((status)::text = ANY ((ARRAY['Menunggu'::character varying, 'Diterima'::character varying, 'Ditolak'::character varying])::text[])))
);


ALTER TABLE public.adoption_requests OWNER TO neondb_owner;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.campaigns (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    organizer character varying(255) NOT NULL,
    description text,
    image_url text,
    target_amount numeric(15,2) NOT NULL,
    collected_amount numeric(15,2) DEFAULT 0 NOT NULL,
    donators_count integer DEFAULT 0 NOT NULL,
    end_date date NOT NULL,
    is_verified boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT campaigns_target_amount_check CHECK ((target_amount > (0)::numeric))
);


ALTER TABLE public.campaigns OWNER TO neondb_owner;

--
-- Name: donations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.donations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    donor_id uuid NOT NULL,
    amount numeric(12,2) NOT NULL,
    message character varying(500),
    payment_status character varying(20) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    campaign_id uuid,
    CONSTRAINT donations_amount_check CHECK ((amount > (0)::numeric)),
    CONSTRAINT donations_payment_status_check CHECK (((payment_status)::text = ANY ((ARRAY['Pending'::character varying, 'Success'::character varying])::text[])))
);


ALTER TABLE public.donations OWNER TO neondb_owner;

--
-- Name: pets; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.pets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    uploader_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    species character varying(50) NOT NULL,
    gender character varying(20),
    age character varying(50),
    location character varying(100),
    description text,
    health_notes text,
    image_url character varying(500),
    status character varying(20) DEFAULT 'Tersedia'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    video_url character varying(500),
    CONSTRAINT pets_status_check CHECK (((status)::text = ANY ((ARRAY['Tersedia'::character varying, 'Diproses'::character varying, 'Diadopsi'::character varying])::text[])))
);


ALTER TABLE public.pets OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    phone character varying(20),
    profile_image_url character varying(500),
    is_verified_shelter boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    shelter_requested boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Data for Name: adoption_requests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.adoption_requests (id, pet_id, adopter_id, status, application_reason, request_date, updated_at) FROM stdin;
bbbb1111-1111-4111-a111-111111111111	aaaa3333-3333-4333-a333-333333333333	11111111-1111-4111-a111-111111111111	Menunggu	Saya punya halaman luas di rumah dan pengalaman memelihara anjing sebelumnya. Buddy akan sangat cocok dengan keluarga kami.	2026-05-16 10:50:03.666769	2026-05-16 10:50:03.666769
bbbb2222-2222-4222-a222-222222222222	aaaa4444-4444-4444-a444-444444444444	22222222-2222-4222-a222-222222222222	Diterima	Saya tinggal di rumah dengan taman kecil dan sudah siap merawat anak anjing. Akan membawa Kopi ke dokter hewan secara rutin.	2026-05-16 10:50:03.666769	2026-05-16 10:50:03.666769
bbbb3333-3333-4333-a333-333333333333	aaaa6666-6666-4666-a666-666666666666	22222222-2222-4222-a222-222222222222	Diterima	Saya mencari anjing penjaga untuk menemani di rumah. Rocky terlihat sangat cocok.	2026-05-16 10:50:03.666769	2026-05-16 10:50:03.666769
d9f7c5ef-640b-44f6-b225-3df0d2492dab	ca4c05e4-a756-41dd-a966-1fda80354740	db546090-cfa7-44bd-b86d-edab123a42b7	Menunggu	aku mw	2026-05-17 13:13:44.95798	2026-05-17 13:13:44.95798
2d0ee733-ded7-4090-bf14-8716266501e9	5a06a6d9-ed9f-4ea3-b97d-2768ba43b0ba	b57ea568-b373-422c-9bc7-1412962ea4f5	Diterima	Aku suka hitam putih\n	2026-05-17 15:49:59.550984	2026-05-17 15:51:24.851288
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.campaigns (id, user_id, title, organizer, description, image_url, target_amount, collected_amount, donators_count, end_date, is_verified, created_at) FROM stdin;
30fea659-0147-424f-b038-bbfc2fa1f823	44bd5e38-c669-46a0-bffa-94acbdde209a	Bantuan pengobatan scabies Putih	Akbar Anvasa Faraby	Kucing Putih ini saya temukan di FIB Universitas Indonesia. Mohon bantuannya 	https://res.cloudinary.com/dhnxlskb8/image/upload/v1779030006/pawconnect/campaigns/ajp3mnx1nb0hjrsy7s9e.png	300000.00	400000.00	3	2026-05-24	t	2026-05-17 15:00:07.613393+00
64345d3c-ac0f-4c43-a660-54da627392a4	db546090-cfa7-44bd-b86d-edab123a42b7	Selamatkan Kucing Minggat	Daffa Rizki	Kucing 3 hari minggat pulang marah marah	https://res.cloudinary.com/dhnxlskb8/image/upload/v1779030333/pawconnect/campaigns/gvia0lq2zveos8ilddnf.png	9999999.00	1010777775.00	3	2026-05-21	t	2026-05-17 15:05:34.292159+00
\.


--
-- Data for Name: donations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.donations (id, donor_id, amount, message, payment_status, created_at, campaign_id) FROM stdin;
cccc1111-1111-4111-a111-111111111111	11111111-1111-4111-a111-111111111111	150000.00	Semoga bisa membantu operasional shelter. Terima kasih atas kerja kerasnya!	Success	2026-05-16 10:50:03.697283	\N
cccc2222-2222-4222-a222-222222222222	22222222-2222-4222-a222-222222222222	75000.00	Untuk makanan hewan-hewan di shelter.	Success	2026-05-16 10:50:03.697283	\N
cccc3333-3333-4333-a333-333333333333	33333333-3333-4333-a333-333333333333	200000.00	Donasi bulanan untuk Jakarta Animal Shelter.	Pending	2026-05-16 10:50:03.697283	\N
bcaf7005-a3c7-43a0-9e35-18407988e0d7	a91afdcd-fea1-4a47-80bb-b3065d94369e	100000.00	\N	Pending	2026-05-16 15:35:13.507194	\N
63374478-a1c0-4976-9fa7-24513dae8047	44bd5e38-c669-46a0-bffa-94acbdde209a	100000.00	Semoga membantu :D	Pending	2026-05-16 15:37:33.887631	\N
974c7f85-2386-492e-9fa0-f06dd40f5493	44bd5e38-c669-46a0-bffa-94acbdde209a	50000.00	Lekas sembuh	Success	2026-05-17 15:01:01.592857	30fea659-0147-424f-b038-bbfc2fa1f823
f47d7993-a901-43b7-8985-dd46e642c92f	17b77fc1-7426-40e9-acc5-27addb50f461	100000.00	Tetap Menyerah dan Jangan Semangat!	Success	2026-05-17 15:01:38.470725	30fea659-0147-424f-b038-bbfc2fa1f823
b8ebb71c-e673-475e-8845-a3ac431aaf00	db546090-cfa7-44bd-b86d-edab123a42b7	250000.00	gws meng	Success	2026-05-17 15:10:34.342098	30fea659-0147-424f-b038-bbfc2fa1f823
04f1762b-9e4c-4f03-94fd-d1f0110366bd	44bd5e38-c669-46a0-bffa-94acbdde209a	3000000.00	Pulang meng	Success	2026-05-17 15:19:43.578899	64345d3c-ac0f-4c43-a660-54da627392a4
3debd016-8727-42c0-9264-4a53111b607e	17b77fc1-7426-40e9-acc5-27addb50f461	999999998.00	Tetap menyerah dan pantang menyerah	Success	2026-05-17 15:19:48.607602	64345d3c-ac0f-4c43-a660-54da627392a4
5fa1dfa6-3792-4418-b04c-af0a008f0b05	db546090-cfa7-44bd-b86d-edab123a42b7	7777777.00	\N	Success	2026-05-17 15:19:59.928281	64345d3c-ac0f-4c43-a660-54da627392a4
\.


--
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.pets (id, uploader_id, name, species, gender, age, location, description, health_notes, image_url, status, created_at, updated_at, video_url) FROM stdin;
aaaa1111-1111-4111-a111-111111111111	11111111-1111-4111-a111-111111111111	Milo	Kucing	Jantan	2 tahun	Jakarta Selatan	Kucing oranye yang sangat ramah dan suka bermain. Cocok untuk keluarga dengan anak-anak.	Sudah vaksin lengkap, steril	https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop	Tersedia	2026-05-16 10:50:03.633969	2026-05-16 10:50:03.633969	\N
aaaa2222-2222-4222-a222-222222222222	11111111-1111-4111-a111-111111111111	Luna	Kucing	Betina	1 tahun	Jakarta Barat	Kucing berbulu putih bersih, pendiam tapi penyayang.	Vaksin rabies sudah, belum steril	https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800&auto=format&fit=crop	Tersedia	2026-05-16 10:50:03.633969	2026-05-16 10:50:03.633969	\N
aaaa3333-3333-4333-a333-333333333333	22222222-2222-4222-a222-222222222222	Buddy	Anjing	Jantan	3 tahun	Depok	Golden Retriever yang sangat aktif dan loyal. Butuh halaman luas.	Sehat, vaksin lengkap, sudah steril	https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop	Tersedia	2026-05-16 10:50:03.633969	2026-05-16 10:50:03.633969	\N
aaaa4444-4444-4444-a444-444444444444	44444444-4444-4444-a444-444444444444	Kopi	Anjing	Jantan	6 bulan	Jakarta Timur	Anak anjing campuran yang diselamatkan dari jalanan. Sangat ceria.	Dalam proses vaksinasi	https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop	Diproses	2026-05-16 10:50:03.633969	2026-05-16 10:50:03.633969	\N
aaaa5555-5555-4555-a555-555555555555	44444444-4444-4444-a444-444444444444	Cici	Kucing	Betina	4 tahun	Tangerang	Kucing calico yang tenang dan cocok untuk apartemen.	Sehat, sudah steril	https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=800&auto=format&fit=crop	Tersedia	2026-05-16 10:50:03.633969	2026-05-16 10:50:03.633969	\N
aaaa6666-6666-4666-a666-666666666666	33333333-3333-4333-a333-333333333333	Rocky	Anjing	Jantan	2 tahun	Bekasi	Anjing penjaga yang jinak dan setia. Sudah terlatih dasar.	Vaksin lengkap	https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=800&auto=format&fit=crop	Diadopsi	2026-05-16 10:50:03.633969	2026-05-16 10:50:03.633969	\N
9ca23a05-d128-48f6-a6b7-73ceaaf97d4c	a91afdcd-fea1-4a47-80bb-b3065d94369e	Miu	Kucing	Betina	1 Bulan	Tangerang	Kecil banget Jir 😂	\N	https://res.cloudinary.com/dhnxlskb8/image/upload/v1778945228/pawconnect/pets/dytjxe7f3lw2tqea2iwy.png	Tersedia	2026-05-16 15:27:11.491345	2026-05-16 15:27:11.491345	https://res.cloudinary.com/dhnxlskb8/video/upload/v1778945229/pawconnect/pets/videos/s8rdo1w0v5etjgvfpdui.mp4
ca4c05e4-a756-41dd-a966-1fda80354740	44bd5e38-c669-46a0-bffa-94acbdde209a	Whiskas	Kucing	Jantan	1 Tahun	Bekasi	Whiskas dateng sendiri ke rumah saya entah dari mana. Kucingnya manja.	Sudah vaksin rabies	https://res.cloudinary.com/dhnxlskb8/image/upload/v1779023540/pawconnect/pets/rp5wpoy2mvlzbfnzyhee.png	Tersedia	2026-05-17 13:12:21.118746	2026-05-17 13:12:21.118746	\N
daac81a4-0e43-4457-9bbc-994bb233259c	b57ea568-b373-422c-9bc7-1412962ea4f5	Mars	Kucing	Jantan	1 Tahun	Cilacap	Gede, berbulu, dan dongo	\N	https://res.cloudinary.com/dhnxlskb8/image/upload/v1779032953/pawconnect/pets/dk9ljlm3hfxmb3o1r5ei.png	Tersedia	2026-05-17 15:49:15.764982	2026-05-17 15:49:15.764982	\N
5a06a6d9-ed9f-4ea3-b97d-2768ba43b0ba	a91afdcd-fea1-4a47-80bb-b3065d94369e	Zoro	Kucing	Jantan	2 Tahun	Tangerang	Kucing Hitam Putih pencinta air dan kaki	Sudah di kebiri	https://res.cloudinary.com/dhnxlskb8/image/upload/v1779032768/pawconnect/pets/wbqvsgaebjtrherwjwpx.png	Diproses	2026-05-17 15:46:11.149235	2026-05-17 15:51:25.06483	https://res.cloudinary.com/dhnxlskb8/video/upload/v1779032768/pawconnect/pets/videos/pycrytvpr1xewekpn1rz.mp4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, name, email, password_hash, phone, profile_image_url, is_verified_shelter, created_at, role, shelter_requested) FROM stdin;
11111111-1111-4111-a111-111111111111	Akbar Rahman	akbar@example.com	$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi	081234567890	\N	f	2026-05-16 10:50:03.602709	user	f
22222222-2222-4222-a222-222222222222	Daffa Pratama	daffa@example.com	$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi	081234567891	\N	f	2026-05-16 10:50:03.602709	user	f
33333333-3333-4333-a333-333333333333	Nabil Azhari	nabil@example.com	$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi	081234567892	\N	f	2026-05-16 10:50:03.602709	user	f
44444444-4444-4444-a444-444444444444	Jakarta Animal Shelter	shelter@example.com	$2b$10$8KzaNdKIMyOkASCBqfG2JeFdBGOiVQHEoSBqaXGsjOcEBfMhiDPfi	02112345678	\N	t	2026-05-16 10:50:03.602709	user	f
a91afdcd-fea1-4a47-80bb-b3065d94369e	Joko Kusumo	Jokokusumo@gmail.com	$2b$10$mIle1XeECuE5sZSmrH78vuNSVbVQKDn7rlNZD6I1QZXDNXH9AhMh2	081342394839	\N	f	2026-05-16 15:25:52.615844	user	f
1412a1cf-6159-43fe-9d0b-71cbdd8435b6	Shelter Budi Harapan	SBH@gmail.com	$2b$10$S0zKFi5o36aDp1GdGPgXqucUkaoFnTDmKk7FiEv/uVDPzxB7lUFfy	081218795969	\N	f	2026-05-17 01:19:52.465249	user	f
44bd5e38-c669-46a0-bffa-94acbdde209a	Akbar Anvasa Faraby	akbaranvasafaraby@gmail.com	$2b$10$w6UCGhjkZ0RvhkYDOBtBVu0KtW6VtdRVS5bmsMa4heQkWEqNWV9za	082111416801	\N	t	2026-05-16 15:26:44.401919	user	f
17b77fc1-7426-40e9-acc5-27addb50f461	Admin	admin@gmail.com	$2b$10$VPhXaK1Bhs1B.sYbkhVJuuJeegB6HsD7gzGsCmZOQ7VuVgcjNBu.y	081218795969	\N	f	2026-05-16 17:53:16.059722	admin	t
db546090-cfa7-44bd-b86d-edab123a42b7	Daffa Rizki	daffa@email.com	$2b$10$mG6jCI2v1sCJyaGoTY13TOyycJ/85y.gDFRpdgMNrNMYV9mFWOSZ.	081122223333	\N	t	2026-05-17 11:31:28.79664	user	f
b57ea568-b373-422c-9bc7-1412962ea4f5	Zhafarrel Adisucipto	zhafarrel@gmail.com	$2b$10$a25m.tYjWMu2Z64xF2ppPehEVYYpK9NKrQtxC0y8k.x3pQ0KSb/aK	081218795969	\N	f	2026-05-17 15:48:01.644099	user	f
\.


--
-- Name: adoption_requests adoption_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_requests_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: donations donations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_pkey PRIMARY KEY (id);


--
-- Name: pets pets_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_adoption_requests_adopter_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_adoption_requests_adopter_id ON public.adoption_requests USING btree (adopter_id);


--
-- Name: idx_adoption_requests_pet_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_adoption_requests_pet_id ON public.adoption_requests USING btree (pet_id);


--
-- Name: idx_campaigns_is_verified; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_campaigns_is_verified ON public.campaigns USING btree (is_verified);


--
-- Name: idx_campaigns_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_campaigns_user_id ON public.campaigns USING btree (user_id);


--
-- Name: idx_donations_campaign_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_donations_campaign_id ON public.donations USING btree (campaign_id);


--
-- Name: idx_donations_donor_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_donations_donor_id ON public.donations USING btree (donor_id);


--
-- Name: idx_pets_location; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_pets_location ON public.pets USING btree (location);


--
-- Name: idx_pets_species; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_pets_species ON public.pets USING btree (species);


--
-- Name: idx_pets_status; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_pets_status ON public.pets USING btree (status);


--
-- Name: idx_pets_uploader_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_pets_uploader_id ON public.pets USING btree (uploader_id);


--
-- Name: idx_users_shelter_requested; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_users_shelter_requested ON public.users USING btree (shelter_requested);


--
-- Name: adoption_requests adoption_requests_adopter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_requests_adopter_id_fkey FOREIGN KEY (adopter_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: adoption_requests adoption_requests_pet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_requests_pet_id_fkey FOREIGN KEY (pet_id) REFERENCES public.pets(id) ON DELETE CASCADE;


--
-- Name: campaigns campaigns_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: donations donations_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE SET NULL;


--
-- Name: donations donations_donor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_donor_id_fkey FOREIGN KEY (donor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: pets pets_uploader_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_uploader_id_fkey FOREIGN KEY (uploader_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict OkOGMI2RWpkuuGVXypmEoH4ApHSsp4Ghif1ReMKomhrf2nunTAy79HbYxW822Y2

