import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class TicketController {
  async create(request: Request, response: Response) {
    try {
      const { userId, ticketTypeId } = request.body;

      const ticket = await prisma.ticket.create({
        data: { userId, ticketTypeId },
      });

      return response.status(201).json(ticket);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const tickets = await prisma.ticket.findMany();

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
      const { userId, ticketTypeId } = request.body;

      const ticket = await prisma.ticket.update({
        where: { id },
        data: { userId, ticketTypeId },
      });

      return response.status(200).json(ticket);
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

      await prisma.ticket.delete({ where: { id } });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
