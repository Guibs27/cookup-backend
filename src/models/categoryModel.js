import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validação com Zod para o modelo de categoria
const categorySchema = z.object({
  id: z.number({
    invalid_type_error: "O id deve ser um valor numérico.",
    required_error: "O id é obrigatório."
  })
    .positive({ message: "O id deve ser um número positivo maior que 0." }),
  name: z.string({
    invalid_type_error: "O nome da categoria deve ser uma string.",
    required_error: "O nome da categoria é obrigatório."
  })
    .min(1, { message: "O nome da categoria deve ter no mínimo 1 caracter." })
    .max(255, { message: "O nome da categoria deve ter no máximo 255 caracteres." }),
});

// Validação para criar uma nova categoria
export const categoryValidateToCreate = (category) => {
  const partialCategorySchema = categorySchema.partial({ id: true });
  return partialCategorySchema.safeParse(category);
};

// Validação para atualizar uma categoria
export const categoryValidateToUpdate = (category) => {
  return categorySchema.safeParse(category);
};

// Validação de ID da categoria
export const categoryValidateId = (id) => {
  const partialCategorySchema = categorySchema.partial({
    name: true
   });
  return partialCategorySchema.safeParse({id});
};

// Listar todas as categorias
export const listCategories = async () => {
  const categories = await prisma.categories.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  return categories;
};

// Obter uma categoria pelo ID
export const getCategoryById = async (id) => {
  const category = await prisma.categories.findUnique({
    where: {
      id,
    },
  });
  return category;
};

// Criar uma nova categoria
export const createCategory = async (category) => {
  const result = await prisma.categories.create({
    data: category,
  });
  return result;
};

// Atualizar uma categoria existente
export const updateCategory = async (id, data) => {
  const result = await prisma.categories.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

// Deletar uma categoria
export const deleteCategory = async (id) => {
  console.log("ID recebido para deletar a categoria:", id);
  const result = await prisma.categories.delete({
    where: {
      id,
    },
  });
  return result;
};