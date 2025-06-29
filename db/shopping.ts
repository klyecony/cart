import { i } from "@instantdb/react";
import { _scd0 } from "./__base";

export const entry = {
  ..._scd0,
  title: i.string().indexed(),
  doneAt: i.date().optional().indexed(),
  paidAt: i.date().optional().indexed(),
};

export const meal = {
  ..._scd0,
  title: i.string().indexed().optional(),
  plannedAt: i.date().optional().indexed(),
  doneAt: i.date().optional().indexed(),
};

export const recipe = {
  ..._scd0,
  title: i.string().indexed(),
  instructions: i.string().optional(),
  prepTime: i.number().optional(),
  cookTime: i.number().optional(),
  servings: i.number().optional(),
};

export const ingredient = {
  ..._scd0,
  title: i.string().indexed(),
  category: i.string().optional().indexed(),
};

export const recipeIngredient = {
  id: i.string().unique().indexed(),
  deletedAt: i.date().optional(),
  updatedAt: i.date().optional(),
  createdAt: i.date(),
  amount: i.number(),
  unit: i.string(),
};
