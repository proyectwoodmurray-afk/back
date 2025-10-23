// src/reservation/reservation.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from '@nestjs/passport'; // Para proteger las rutas

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Ruta pública para ver todas las reservas
  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  // Ruta pública para crear una nueva reserva
  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  // Ruta protegida para actualizar el estado de la reserva (solo admin)
  @UseGuards(AuthGuard('jwt')) // Asegura que el usuario esté autenticado
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.reservationService.updateStatus(id, status);
  }

  // Ruta protegida para eliminar una reserva (solo admin)
  @UseGuards(AuthGuard('jwt')) // Asegura que el usuario esté autenticado
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservationService.delete(id);
  }
}
