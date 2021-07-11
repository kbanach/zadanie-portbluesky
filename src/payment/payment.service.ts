import { Injectable } from "@nestjs/common";
const stringify = require("csv-stringify/lib/sync");
import {
  addMonths,
  formatISO,
  isSaturday,
  isSunday,
  lastDayOfMonth,
  nextWednesday,
  parseISO,
  setDate,
  subDays,
} from "date-fns";
import { PaymentDate } from "./payment.dto";

@Injectable()
export class PaymentService {
  public readonly ISO_DATE_REGEX =
    /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  private parseWithOffset(isoDate, monthOffset): Date {
    return addMonths(parseISO(isoDate), monthOffset);
  }

  private getNextBaseSalaryPaymentForDate(
    isoDate: string,
    monthOffset: number
  ): string {
    if (!this.ISO_DATE_REGEX.test(isoDate)) {
      throw new Error("Wrong date format. Please try YYYY-MM-DD");
    }

    let paymentDay = lastDayOfMonth(this.parseWithOffset(isoDate, monthOffset));

    if (isSaturday(paymentDay)) {
      paymentDay = subDays(paymentDay, 1);
    } else if (isSunday(paymentDay)) {
      paymentDay = subDays(paymentDay, 2);
    }

    return formatISO(paymentDay, { representation: "date" });
  }

  private getNextBonusPaymentForDate(
    isoDate: string,
    monthOffset: number
  ): string {
    if (!this.ISO_DATE_REGEX.test(isoDate)) {
      throw new Error("Wrong date format. Please try YYYY-MM-DD");
    }

    const parsedDate = this.parseWithOffset(isoDate, monthOffset);
    let paymentDay = setDate(parsedDate, 15);

    if (isSaturday(paymentDay) || isSunday(paymentDay)) {
      paymentDay = nextWednesday(paymentDay);
    }

    return formatISO(paymentDay, { representation: "date" });
  }

  public getPaymentDates(startDate: string, length = 12): PaymentDate[] {
    const paymentDates: PaymentDate[] = [];

    for (let i = 0; i < length; i++) {
      paymentDates.push({
        baseSalaryDate: this.getNextBaseSalaryPaymentForDate(startDate, i),
        bonusDate: this.getNextBonusPaymentForDate(startDate, i),
      });
    }

    return paymentDates;
  }

  private getCsvHeaders(): string[] {
    return ["Bonus payment date", "Base salary payment date"];
  }

  private paymentDateToCsvRow(date: PaymentDate): string[] {
    return [date.bonusDate, date.baseSalaryDate];
  }

  public paymentDatesToCSV(paymentDates: PaymentDate[]): string {
    return stringify([
      this.getCsvHeaders(),
      ...paymentDates.map((d) => this.paymentDateToCsvRow(d)),
    ]);
  }
}
