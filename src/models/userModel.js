import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const accountSchema = z.object({
  id: z.number({
    invalid_type_error: "O id deve ser um valor numérico.",
    required_error: "O id é obrigatório."
  })
    .positive({ message: "O id deve ser um número positivo maior que 0." }),
  public_id: z.string({
    invalid_type_error: "O public_id deve ser uma string.",
    required_error: "O public_id é obrigatório."
  }),
  name: z.string({
    invalid_type_error: "O nome deve ser uma string.",
    required_error: "O nome é obrigatório."
  })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  email: z.string({
    invalid_type_error: "O email deve ser uma string.",
    required_error: "O email é obrigatório."
  })
    .email({ message: "Email inválido." })
    .max(200, { message: "O email deve ter no máximo 200 caracteres." }),
  avatar: z.string({
    invalid_type_error: "O avatar deve ser uma string."
  })
    .url({ message: "URL inválida" })
    .min(11, { message: "O avatar deve ter no mínimo 11 caracteres." })
    .max(1000, { message: "O avatar deve ter no máximo 1000 caracteres." })
    .optional(),
  pass: z.string({
    invalid_type_error: "A senha deve ser uma string.",
    required_error: "A senha é obrigatória."
  })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
    .max(500, { message: "A senha deve ter no máximo 500 caracteres." }),
  birth_date: z.string({
    invalid_type_error: 'A data de nascimento deve ser um string "aaaa-mm-dd".',
    required_error: "A data de nascimento é obrigatória."
  })
});

export const userValidateToCreate = (account) => {
  const partialAccountSchema = accountSchema.partial({ id: true, public_id: true });
  return partialAccountSchema.safeParse(account);
};

export const userValidateToLogin = (account) => {
  const partialAccountSchema = accountSchema.partial({ id: true, public_id: true, avatar: true, name: true, birth_date: true });
  return partialAccountSchema.safeParse(account);
};

export const userValidateToUpdate = (account) => {
  const partialAccountSchema = accountSchema.partial({ id: true, public_id: true, pass: true });
  return partialAccountSchema.safeParse(account);
};

export const getByPublicId = async (public_id) => {
  return await prisma.user.findUnique({
    where: { public_id },
  });
};

export const getById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const getByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const signUp = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

export const updateUser = async (public_id, data) => {
  return await prisma.user.update({
    where: { public_id },
    data,
  });
};

export const deleteUser = async (public_id) => {
  return await prisma.user.delete({
    where: { public_id },
  });
};