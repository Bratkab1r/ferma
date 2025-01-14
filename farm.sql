PGDMP      4                |            farm    16.1    16.0 W               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24765    farm    DATABASE     x   CREATE DATABASE farm WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE farm;
                postgres    false            �            1259    24766    animal-list    TABLE     \   CREATE TABLE public."animal-list" (
    animal character varying,
    id bigint NOT NULL
);
 !   DROP TABLE public."animal-list";
       public         heap    postgres    false            �            1259    24771    animal-list_id_seq    SEQUENCE     }   CREATE SEQUENCE public."animal-list_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."animal-list_id_seq";
       public          postgres    false    215                        0    0    animal-list_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."animal-list_id_seq" OWNED BY public."animal-list".id;
          public          postgres    false    216            �            1259    24820 
   categories    TABLE     w   CREATE TABLE public.categories (
    category_id bigint NOT NULL,
    category_name character varying(128) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    24819    categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    226            !           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    225            �            1259    24772    ootchet    TABLE     c   CREATE TABLE public.ootchet (
    animal character varying,
    data date,
    quantity numeric
);
    DROP TABLE public.ootchet;
       public         heap    postgres    false            �            1259    24853    orders    TABLE     <  CREATE TABLE public.orders (
    order_id bigint NOT NULL,
    user_id bigint NOT NULL,
    stamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    order_json json NOT NULL,
    reason character varying(128),
    status character varying(128) NOT NULL,
    title character varying(128) NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    24851    orders_order_id_seq    SEQUENCE     |   CREATE SEQUENCE public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orders_order_id_seq;
       public          postgres    false    232            "           0    0    orders_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;
          public          postgres    false    230            �            1259    24852    orders_user_id_seq    SEQUENCE     {   CREATE SEQUENCE public.orders_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.orders_user_id_seq;
       public          postgres    false    232            #           0    0    orders_user_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.orders_user_id_seq OWNED BY public.orders.user_id;
          public          postgres    false    231            �            1259    24777    report    TABLE     �   CREATE TABLE public.report (
    id bigint NOT NULL,
    data date,
    event character varying,
    animal character varying,
    quantity bigint,
    weight bigint,
    note character varying
);
    DROP TABLE public.report;
       public         heap    postgres    false            �            1259    24782 	   otchetnic    VIEW     w   CREATE VIEW public.otchetnic AS
 SELECT animal,
    sum(quantity) AS quantity
   FROM public.report
  GROUP BY animal;
    DROP VIEW public.otchetnic;
       public          postgres    false    218    218            �            1259    24828    products    TABLE       CREATE TABLE public.products (
    id bigint NOT NULL,
    title character varying(128) NOT NULL,
    description text NOT NULL,
    price numeric NOT NULL,
    category_id bigint NOT NULL,
    img_url text NOT NULL,
    quantity bigint DEFAULT 5 NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    24827    products_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.products_category_id_seq;
       public          postgres    false    229            $           0    0    products_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.products_category_id_seq OWNED BY public.products.category_id;
          public          postgres    false    228            �            1259    24826    products_id_seq    SEQUENCE     x   CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    229            %           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    227            �            1259    24786    report_id_seq    SEQUENCE     v   CREATE SEQUENCE public.report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.report_id_seq;
       public          postgres    false    218            &           0    0    report_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.report_id_seq OWNED BY public.report.id;
          public          postgres    false    220            �            1259    24989    reviews    TABLE       CREATE TABLE public.reviews (
    review_id bigint NOT NULL,
    rating numeric NOT NULL,
    review text NOT NULL,
    product_id bigint NOT NULL,
    stamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying(256)
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    24988    reviews_product_id_seq    SEQUENCE        CREATE SEQUENCE public.reviews_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.reviews_product_id_seq;
       public          postgres    false    235            '           0    0    reviews_product_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.reviews_product_id_seq OWNED BY public.reviews.product_id;
          public          postgres    false    234            �            1259    24987    reviews_review_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    235            (           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    233            �            1259    33180    roles    TABLE     j   CREATE TABLE public.roles (
    role_id bigint NOT NULL,
    role_name character varying(128) NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    33179    roles_role_id_seq    SEQUENCE     z   CREATE SEQUENCE public.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.roles_role_id_seq;
       public          postgres    false    237            )           0    0    roles_role_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;
          public          postgres    false    236            �            1259    24787 
   user_token    TABLE     k   CREATE TABLE public.user_token (
    id bigint NOT NULL,
    token character varying,
    userid bigint
);
    DROP TABLE public.user_token;
       public         heap    postgres    false            �            1259    24792    user_token_id_seq    SEQUENCE     z   CREATE SEQUENCE public.user_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.user_token_id_seq;
       public          postgres    false    221            *           0    0    user_token_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_token_id_seq OWNED BY public.user_token.id;
          public          postgres    false    222            �            1259    24793    users    TABLE     �   CREATE TABLE public.users (
    uid bigint NOT NULL,
    name character varying,
    email character varying,
    password character varying,
    role_ids bigint DEFAULT 1
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24798    users_uid_seq    SEQUENCE     v   CREATE SEQUENCE public.users_uid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.users_uid_seq;
       public          postgres    false    223            +           0    0    users_uid_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.users_uid_seq OWNED BY public.users.uid;
          public          postgres    false    224            M           2604    24799    animal-list id    DEFAULT     t   ALTER TABLE ONLY public."animal-list" ALTER COLUMN id SET DEFAULT nextval('public."animal-list_id_seq"'::regclass);
 ?   ALTER TABLE public."animal-list" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            R           2604    24823    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    225    226    226            V           2604    24856    orders order_id    DEFAULT     r   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    230    232    232            W           2604    24857    orders user_id    DEFAULT     p   ALTER TABLE ONLY public.orders ALTER COLUMN user_id SET DEFAULT nextval('public.orders_user_id_seq'::regclass);
 =   ALTER TABLE public.orders ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    232    231    232            S           2604    24831    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    227    229            T           2604    24832    products category_id    DEFAULT     |   ALTER TABLE ONLY public.products ALTER COLUMN category_id SET DEFAULT nextval('public.products_category_id_seq'::regclass);
 C   ALTER TABLE public.products ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    228    229    229            N           2604    24800 	   report id    DEFAULT     f   ALTER TABLE ONLY public.report ALTER COLUMN id SET DEFAULT nextval('public.report_id_seq'::regclass);
 8   ALTER TABLE public.report ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    218            Y           2604    24992    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    233    235    235            Z           2604    24993    reviews product_id    DEFAULT     x   ALTER TABLE ONLY public.reviews ALTER COLUMN product_id SET DEFAULT nextval('public.reviews_product_id_seq'::regclass);
 A   ALTER TABLE public.reviews ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    234    235    235            \           2604    33183    roles role_id    DEFAULT     n   ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);
 <   ALTER TABLE public.roles ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    236    237    237            O           2604    24801    user_token id    DEFAULT     n   ALTER TABLE ONLY public.user_token ALTER COLUMN id SET DEFAULT nextval('public.user_token_id_seq'::regclass);
 <   ALTER TABLE public.user_token ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            P           2604    24802 	   users uid    DEFAULT     f   ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_uid_seq'::regclass);
 8   ALTER TABLE public.users ALTER COLUMN uid DROP DEFAULT;
       public          postgres    false    224    223                      0    24766    animal-list 
   TABLE DATA           3   COPY public."animal-list" (animal, id) FROM stdin;
    public          postgres    false    215   6_                 0    24820 
   categories 
   TABLE DATA           @   COPY public.categories (category_id, category_name) FROM stdin;
    public          postgres    false    226   `                 0    24772    ootchet 
   TABLE DATA           9   COPY public.ootchet (animal, data, quantity) FROM stdin;
    public          postgres    false    217   t`                 0    24853    orders 
   TABLE DATA           ]   COPY public.orders (order_id, user_id, stamp, order_json, reason, status, title) FROM stdin;
    public          postgres    false    232   pa                 0    24828    products 
   TABLE DATA           a   COPY public.products (id, title, description, price, category_id, img_url, quantity) FROM stdin;
    public          postgres    false    229    g                 0    24777    report 
   TABLE DATA           Q   COPY public.report (id, data, event, animal, quantity, weight, note) FROM stdin;
    public          postgres    false    218   i                 0    24989    reviews 
   TABLE DATA           U   COPY public.reviews (review_id, rating, review, product_id, stamp, name) FROM stdin;
    public          postgres    false    235   �j                 0    33180    roles 
   TABLE DATA           3   COPY public.roles (role_id, role_name) FROM stdin;
    public          postgres    false    237   �l       	          0    24787 
   user_token 
   TABLE DATA           7   COPY public.user_token (id, token, userid) FROM stdin;
    public          postgres    false    221   �l                 0    24793    users 
   TABLE DATA           E   COPY public.users (uid, name, email, password, role_ids) FROM stdin;
    public          postgres    false    223   �n       ,           0    0    animal-list_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."animal-list_id_seq"', 42, true);
          public          postgres    false    216            -           0    0    categories_category_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.categories_category_id_seq', 7, true);
          public          postgres    false    225            .           0    0    orders_order_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.orders_order_id_seq', 16, true);
          public          postgres    false    230            /           0    0    orders_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_user_id_seq', 1, false);
          public          postgres    false    231            0           0    0    products_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.products_category_id_seq', 1, false);
          public          postgres    false    228            1           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 8, true);
          public          postgres    false    227            2           0    0    report_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.report_id_seq', 57, true);
          public          postgres    false    220            3           0    0    reviews_product_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reviews_product_id_seq', 7, true);
          public          postgres    false    234            4           0    0    reviews_review_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reviews_review_id_seq', 19, true);
          public          postgres    false    233            5           0    0    roles_role_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.roles_role_id_seq', 3, true);
          public          postgres    false    236            6           0    0    user_token_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_token_id_seq', 311, true);
          public          postgres    false    222            7           0    0    users_uid_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.users_uid_seq', 13, true);
          public          postgres    false    224            ^           2606    24804    animal-list animal-list_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."animal-list"
    ADD CONSTRAINT "animal-list_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."animal-list" DROP CONSTRAINT "animal-list_pkey";
       public            postgres    false    215            f           2606    24825    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    226            j           2606    24861    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    232            h           2606    24836    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    229            `           2606    24806    report report_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.report DROP CONSTRAINT report_pkey;
       public            postgres    false    218            l           2606    24997    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    235            n           2606    33185    roles roles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    237            b           2606    24808    user_token user_token_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_token
    ADD CONSTRAINT user_token_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_token DROP CONSTRAINT user_token_pkey;
       public            postgres    false    221            d           2606    24810    users users_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    223            r           2606    24862    orders orders_user_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(uid);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    4708    223    232            q           2606    24837 "   products products_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);
 L   ALTER TABLE ONLY public.products DROP CONSTRAINT products_category_id_fkey;
       public          postgres    false    4710    229    226            s           2606    24998    reviews reviews_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_product_id_fkey;
       public          postgres    false    235    4712    229            o           2606    24811 !   user_token user_token_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_token
    ADD CONSTRAINT user_token_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(uid);
 K   ALTER TABLE ONLY public.user_token DROP CONSTRAINT user_token_userid_fkey;
       public          postgres    false    223    4708    221            p           2606    33187    users users_roleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roleid_fkey FOREIGN KEY (role_ids) REFERENCES public.roles(role_id) NOT VALID;
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_roleid_fkey;
       public          postgres    false    4718    223    237               �   x�m�K�@D�ӧ�FfP�.5a�11nM� ���
�7�,H�ү����<�rF�%�(� Vz@XW�)�Jk��*�xȗ#��Kxe�8�PF����L��OH�u�v`c��/'�nfFN݊���:���iɽ>nH�1_�cA
���P� 8F���;�,\�z�#�j�(3n�lN�Nv�'���U�v�i�'�'U���         R   x�3�0�¾��]�t��ˈ���[/6]l��qaׅ\Ɯ&9�@�'Pd�Ŧ[/lk�q��¦.쇐\1z\\\ ѐ0[         �   x���K�@D��)� ��e<J�cb���$*�O�+T��4�V$U3կk�^�C6��BT��T"�X�e��0�#�GD"�~Ǔ��ܱN���˵;_=j����|Z�vd� �Q"�>ymϕ0)(�2���2i!p�L}�U��NL�!�h�Y�ar$��-%fpI�h�E��,���9�MD����Μ�]�FY��\��Uu�Z�n�?��on����}��#V3!�9�K         �  x��X�n5��y��^ǃ?�{�.)�l�'lI��IUjBE+QD/�rA_a�&"M��fވϳ)�m��%�І^��㟱}|��>���1���0�g��27ӽϿ�A1`����pk5b���~Q���6�?ǆ2n��pck�����6��f�٩���1�ޯ��ف9��Cz%pk->�W�Gw��Ik��V�o�V�ɭ�o�+X��m������bzԚ��.p�դ�OؼWc؊���0��E�Ƨ��	v�Iq��Խ>��������J��T %�1>JbY\�*"<�@���I�8�ѓ���q�'�������h)�%�#�JC��14Z��X�l��2N��. 
Is��2��iȞև�N��V��C����r�o����<����D��x\�������$5�q��g0킔�@���˘B��e�ե�(��o�����\��`+��Y�@� G,�/(�4H�!��<��`*W\jˮ�D^�{K�{��{�׆bC��(���yܟ2�<��v��������OS�4�v��g@��j-���7�KʞW�w�&E��2AI���UL
�3y�T�$�\1*�"�u �3ʼX�@���@�BDpE�K��pOu�_
*
Nscy�#�R�a����� �" !�\ �J�V<�Ty��)��A�0��� �EJ#fy�����{x����Ǆ�y��g�	�f��R��~����ޖ��<�Ɛɹ�vg�բ�[�ۺ@Ԏ��c��i�BE��<�B�������*�-HKM�p}T������+Ha���;���4��>�FY�N��R�H/������)�?j�r����CI��'�P��ZR�������Dg���	�O�SL͉�8͋�|-�������n�+,]-;E��uK���ib��l�9I�O\�"2!-+e�:�C�΅P�]���i/h�u&[K�5\=�������^ -%���)Y	�Ĉ��L�5 �AS��5�ԻH�_�{�eDT֣x��5^.�-���L�.�W\��2 ��� �+����cz��|�I�fe�7�)�/�x�g�C�UQ����cܡ9����*k���9A%����E&��}�I�j����ҵ���0鉏e�T8�Ȁu$���:�F[��������}�t`x���*�В$xd�tBY���95�p^��ʵ��\�J:}l�z��tj8�~k���]?L?{7Yw�`��<���N,��c���H:����_O���?��6�\�ZV���"!��a�A��ݿ���^Y�G��"ÃÔK�h V����>�����pɥ��z�O�Ʋh!�P��U(*N</10)�;�Z-�-L]sn����j�C�^���!��gFSZ5��zUs�����I`�q���
�����D�1��gY�'�P��         �  x��S�N�@>�>�>@k�v�s�Z����U� T�=@���� ��W�B"�W�}#����Ñ��]����3G|˝/��`:�\��~�o���ﰽ�6����g�u�'�0�������v�A�^�9rpq$7� �*P�k����X����X�!�-�9 ��\2�����oY��� gv���E>-h���Y>�
��L�8�q������`����ۍ�
�&& .r�@P��7���%�+��EȢ$PB������@<��K1Pc�hE=ƙo]�w"��$,�+Q2��Q��H)�P0*!�U�_����Y���_�~Λg���s1Y����Q�[�E4���%۟cGf�zoz:�T�3)�����K)jǍ���l3��.i����6V����s�x����5%6{P�=3��T�喨�TfJ/5�Ph�c���=7Rl^��E����k+����0�������1�	�T:         �  x��TKNA]ל�`���� $n0&ča��`���\��F�j�ݰ��L�{U���.H��4�V37�/����׼�9��w����K�T�S�[���[����W��F�v<ȳ���S��}�΅�S��2��|���;����������|/T�Ii��Y�S��6�~����n�H���#�����CI/��kt$z>��'��%Dr�|%�ɒEt���~�gm����w��O��>��/'�脢;t�IFX	%�
�"�B��$�6��I���5X�P�
IH?�%��4���
�Y�삔����SZ��~rd�s�Z���F+)�M}|e�R�%���b��7u��Z�U�o��*vr��	�8"s�O)��v�	���,�3#�\         �  x�m�MNA��=��VU�"'`�+���
 HP\eH�bp<�B��R� �X��L����ޠ iDڦ>I����������u�P�[�Q����J4��CCBqm�i�S�ZVY�?\�����q��$ԥ\	���>����AIr�ZW`�^����L�.��Do�B���jL*'A����Ի E��
�tL0w|*�.�"�$4&ԙB�i��]��T���D��tq��.�TA��J�Ѕ^.�{`�HD3�$j�2ۘ�%��*���b�\N�hV&��֋@]W���}&H��
Øv��UIV�j�F5����ih�\���v��Wo9��-ۮ�u�ɷ�K:7V|>�����A�w�~��#�K��г܆Gx���L���k>[��h�����F����J���'����Y��[��Һ��N���߉?��#u��rKԖf9�Z��N��~e�4W�9         #   x�3�,-N-�2�,�/�2�9Sr3�b���� ��      	     x���N�@D���D3�s}dC�H�lA	�\;&���|�&Z	��ɒ=�T���E��q[����zZ��宰���Sl~��A�uw}5(s����:�ܴۇ�[����|S���ewsx��E�QWϣ�7�o緇������׳�ѺZ�o��������d7���~�;v�w��g����x>����z��}��򵛅�9��u��2�7�W��|y�\=4����V���Y�8
��"�PGF1A�&���T<�3�T(@�ZH����HE%Q,`��	C]���b�Rz�b�4L8FɌ�b�u�BzTe�F��0b�B݈�.dꪁ�ij(�C]��WC�����x�ԕ�J���� �Q�G��L�G�B�@�h��K��z� U��ȷ�ꊥ�Ð(�ug�(��pL����0(h�P�Q�Q��z�y�D)J�;����`*J�G=eUJE��f�0���):�)^7S�3�� ��Z
u3����FLE1^�`g��J��h�X��~����          �   x�e̹�0 ��}f��D�4ԃ#��M\8
4�7��]؜�o�#�i�����U�(ո���G
��-,��� >5�-ȯo�JoqC�|V��O��� ͤ.����l� ���OR{����p����44�e����^{.�#K���9֫�j�UGfB7��W�� ��<k     