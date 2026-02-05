import { Request } from "express";

export const tagParser = (tags: string[]): string[] => {
  return tags.map((t) => t.toLowerCase());
};

export const parameterIDProcessor = (req: Request):string => {
    return Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
}