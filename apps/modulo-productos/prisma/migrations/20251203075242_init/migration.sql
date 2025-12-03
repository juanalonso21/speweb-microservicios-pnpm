-- CreateTable
CREATE TABLE "_ProductoCategorias" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductoCategorias_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductoCategorias_B_index" ON "_ProductoCategorias"("B");

-- AddForeignKey
ALTER TABLE "_ProductoCategorias" ADD CONSTRAINT "_ProductoCategorias_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductoCategorias" ADD CONSTRAINT "_ProductoCategorias_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
