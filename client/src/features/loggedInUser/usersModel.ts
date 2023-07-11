import Joi from "joi";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  user_id: number;
}

export const UserJoi = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  user_id: Joi.number(),
});
