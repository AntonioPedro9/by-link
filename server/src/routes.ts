import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { EventInfoController } from "./controllers/EventInfoController";
import { TicketController } from "./controllers/TicketController";
import { TicketTypeController } from "./controllers/TicketTypeController";

const router = Router();

const userController = new UserController();
router.post("/users", userController.create);
router.get("/users", userController.list);
router.get("/users/:id/tickets", userController.getUserTickets);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

const eventInfoController = new EventInfoController();
router.post("/event-info", eventInfoController.create);
router.get("/event-info", eventInfoController.list);
router.get("/event-info/:id/ticket-types", eventInfoController.getTicketTypes);
router.put("/event-info/:id", eventInfoController.update);
router.delete("/event-info/:id", eventInfoController.delete);

const ticketController = new TicketController();
router.post("/tickets", ticketController.create);
router.get("/tickets", ticketController.list);
router.put("/tickets/:id", ticketController.update);
router.delete("/tickets/:id", ticketController.delete);

const ticketTypeController = new TicketTypeController();
router.post("/ticket-types", ticketTypeController.create);
router.get("/ticket-types", ticketTypeController.list);
router.get("/ticket-types/:id/tickets", ticketTypeController.getTickets);
router.put("/ticket-types/:id", ticketTypeController.update);
router.delete("/ticket-types/:id", ticketTypeController.delete);

export { router };
