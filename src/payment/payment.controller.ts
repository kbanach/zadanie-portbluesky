import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Res,
} from "@nestjs/common";
import stringify from "csv-stringify/lib/sync";
import { Response } from "express";
import { PaymentFormat, PaymentDate, PaymentDatesQuery } from "./payment.dto";
import { PaymentService } from "./payment.service";

@Controller("v1/payment")
export class PaymentController {
  constructor(private readonly PaymentService: PaymentService) {}

  @Get(":paymentStartDate")
  getPaymentDates(
    @Param("paymentStartDate") startDate: string,
    @Query() query: PaymentDatesQuery,
    @Res() res: Response
  ) {
    try {
      const paymentDates = this.PaymentService.getPaymentDates(startDate);

      switch (query.format) {
        case PaymentFormat.CSV:
          return res.send(
            Buffer.from(this.PaymentService.paymentDatesToCSV(paymentDates))
          );
        case PaymentFormat.TEXT:
        case PaymentFormat.JSON:
        default:
          return res.json(paymentDates);
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
