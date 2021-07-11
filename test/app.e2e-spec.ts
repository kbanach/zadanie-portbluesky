import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { PaymentModule } from "./../src/payment/payment.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PaymentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("/v1/payment/2021-01-01 (GET)", () => {
    it("returns 200", () => {
      return request(app.getHttpServer())
        .get("/v1/payment/2021-01-01")
        .expect(200);
    });

    it("returns proper dates for 2021-01-01", () => {
      return request(app.getHttpServer())
        .get("/v1/payment/2021-01-01")
        .expect((res) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it("returns CSV file for parameter format=csv for 2021-01-01", () => {
      return request(app.getHttpServer())
        .get("/v1/payment/2021-01-01?format=csv")
        .expect((res) => {
          expect(res.headers["content-type"]).toMatch(
            "application/octet-stream"
          );
          expect(res.body).toMatchSnapshot();
        });
    });
  });
});
