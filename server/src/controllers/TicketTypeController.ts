import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class TicketTypeController {
  async create(request: Request, response: Response) {
    try {
      const { name, price, description, eventId } = request.body;

      const ticketType = await prisma.ticketType.create({
        data: { name, price, description, eventId },
      });

      return response.status(201).json(ticketType);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const ticketTypes = await prisma.ticketType.findMany();

      return response.status(200).json(ticketTypes);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async getTickets(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const ticketType = await prisma.ticketType.findUnique({
        where: { id },
        include: { tickets: true },
      });

      if (!ticketType) {
        return response.status(404).json({ error: "Ticket type not found" });
      }

      return response.status(200).json(ticketType.tickets);
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
      const { name, price, description, eventId } = request.body;

      const ticketType = await prisma.ticketType.update({
        where: { id },
        data: { name, price, description, eventId },
      });

      return response.status(200).json(ticketType);
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

      await prisma.ticketType.delete({ where: { id } });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
