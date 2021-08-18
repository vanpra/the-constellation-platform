insert into public.topics (title, description) values ('General', 'General discussion');
insert into public.topics (title, description) values ('HIV/AIDS', 'HIV/AIDS competence and education');
insert into public.topics (title, description) values ('Immunisation', 'Preventing and managing the spread of infectious disease');
insert into public.topics (title, description) values ('Domestic Life', 'Issues relating to the home');
insert into public.topics (title, description) values ('Youth', 'Helping to support young people to become their best');
insert into public.topics (title, description) values ('Social', 'For relationship forming and moulding');
insert into public.topics (title, description) values ('Economic', 'Helping members to stay above the poverty line');

insert into public.users (id, full_name) values ('79a50432-25f5-4320-acee-8882f7abd1e9', 'Joe Bloggs');
insert into public.posts (user_id, topic_id, title, description, content) values 
  ('79a50432-25f5-4320-acee-8882f7abd1e9', 1, 'Test article with a title', 
  'This is an example description about the contents of the article', 
  'This is test content of a article');
    