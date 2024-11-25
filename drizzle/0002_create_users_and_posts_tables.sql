CREATE TABLE "users" (
  "id" UUID PRIMARY KEY,
  "email" TEXT NOT NULL,
  "username" TEXT,
  "bio" TEXT
);

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "author_id" UUID REFERENCES users("id")
);