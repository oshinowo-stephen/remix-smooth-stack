-- CreateTable
CREATE TABLE "Track" (
    "title" TEXT NOT NULL PRIMARY KEY,
    "about" TEXT NOT NULL,
    "t_url" TEXT NOT NULL,
    "author" TEXT,
    "playlist" TEXT DEFAULT 'the-smooth-list'
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_title_key" ON "Track"("title");
