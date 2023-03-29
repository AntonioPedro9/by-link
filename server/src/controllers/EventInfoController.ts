import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class EventInfoController {
  async create(request: Request, response: Response) {
    try {
      const { name, date, location, description } = request.body;

      const eventInfo = await prisma.eventInfo.create({
        data: { name, date, location, description },
      });

      return response.status(201).json(eventInfo);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const eventInfos = await prisma.eventInfo.findMany();

      return response.status(200).json(eventInfos);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async getTicketTypes(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const eventInfo = await prisma.eventInfo.findUnique({
        where: { id },
        include: { ticketTypes: true },
      });

      return response.status(200).json(eventInfo?.ticketTypes || []);
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
      const { name, date, location, description } = request.body;

      const eventInfo = await prisma.eventInfo.update({
        where: { id },
        data: { name, date, location, description },
      });

      return response.status(200).json(eventInfo);
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

      await prisma.eventInfo.delete({ where: { id } });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.message);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
