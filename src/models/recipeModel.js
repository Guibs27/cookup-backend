import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const recipeSchema = z.object({
  id: z.number({
    invalid_type_error: "O id deve ser um valor numérico.",
    required_error: "O id é obrigatório."
  })
    .positive({ message: "O id deve ser um número positivo maior que 0." }),
  title: z.string({
    invalid_type_error: "O nome da receita deve ser uma string.",
    required_error: "O nome da receita é obrigatório."
  })
    .min(1, { message: "O nome da receita deve ter no mínimo 1 caracter." })
    .max(255, { message: "O nome da receita deve ter no máximo 255 caracteres." }),
  ingredients: z.string({
    invalid_type_error: "Os ingredientes devem ser uma string.",
    required_error: "Os ingredientes são obrigatórios."
  })
    .min(1, { message: "Os ingredientes devem ter no mínimo 1 caracter." }),
  step_by_step: z.string({
    invalid_type_error: "Os passos devem ser uma string.",
    required_error: "Os passos são obrigatórios."
  })
    .min(1, { message: "Os passos devem ter no mínimo 1 caracter." }),
  recipe_image: z.string({
    invalid_type_error: "A URL da imagem deve ser uma string."
  })
    .url({ message: "URL inválida" })
    .min(11, { message: "A URL deve ter no mínimo 11 caracteres." })
    .max(1000, { message: "A URL deve ter no máximo 1000 caracteres." })
    .optional(),
  user_id: z.number({
    invalid_type_error: "O user_id deve ser um valor numérico.",
    required_error: "O user_id é obrigatório."
  })
    .positive({ message: "O user_id deve ser um número positivo maior que 0." }),
  category_id: z.number({
    invalid_type_error: "O category_id deve ser um valor numérico.",
    required_error: "O category_id é obrigatório."
  })
    .positive({ message: "O category_id deve ser um número positivo maior que 0." })
});

export const recipeValidateToCreate = (recipe) => {
  const partialRecipeSchema = recipeSchema.partial({ id: true, user_id: true })
  return partialRecipeSchema.safeParse(recipe)
}

export const recipeValidateToUpdate = (recipe) => {
  const partialRecipeSchema = recipeSchema.partial({ user_id: true })
  return partialRecipeSchema.safeParse(recipe)
}

export const recipeValidateId = (id) => {
  const partialRecipeSchema = recipeSchema.partial({
    title: true,
    ingredients: true,
    step_by_step: true,
    recipe_image: true,
    user_id: true
  })
  return partialRecipeSchema.safeParse({ id })
}

export const listRecipes = async (public_id) => {
  const recipes = await prisma.recipes.findMany({
    orderBy: {
      id: 'desc'
    },
    where: {
      user: {
        public_id
      }
    },
    include: {
      category: true
    }
  });
  return recipes;
}

export const getByIdRecipe = async (id, public_id) => {
  const recipe = await prisma.recipes.findFirst({
    where: {
      id: id,
      user: {
        public_id
      }
    },
    include: {
      category: true 
    }
  });
  return recipe;
};

export const createRecipe = async (recipe) => {
  const result = await prisma.recipes.create({
    data: recipe
  })
  return result
}

export const deleteRecipe = async (id, public_id) => {
  const recipe = await prisma.recipes.delete({
    where: {
      id: id,
      user: {
        public_id
      }
    }
  })
  return recipe
}

export const updateRecipe = async (recipe, public_id) => {
  const result = await prisma.recipes.update({
    data: recipe,
    where: {
      id: recipe.id,
      user: {
        public_id
      }
    }
  })
  return result
}