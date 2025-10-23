// src/reservation/reservation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  create(dto: CreateReservationDto) {
    return this.reservationModel.create(dto);
  }

  findAll() {
    return this.reservationModel.find().exec();
  }

  updateStatus(id: string, status: string) {
    return this.reservationModel.findByIdAndUpdate(id, { status }).exec();
  }

  delete(id: string) {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}
