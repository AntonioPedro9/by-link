import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, password_hash, phonenumber } = request.body;

      const user = await prisma.user.create({
        data: { name, email, password_hash, phonenumber },
      });

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const users = await prisma.user.findMany();

      return response.status(200).json(users);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserTickets(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const tickets = await prisma.ticket.findMany({
        where: { userId: id },
        include: { ticketType: true },
      });

      return response.status(200).json(tickets);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, email, password_hash, phonenumber } = request.body;

      const user = await prisma.user.update({
        where: { id },
        data: { name, email, password_hash, phonenumber },
      });

      return response.status(200).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await prisma.user.delete({ where: { id } });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
