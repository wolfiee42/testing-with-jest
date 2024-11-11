const PaymentService = {
  processPayment: jest.fn(),
};

describe("Payment Service Test", () => {
  it("should return first payment successfull and the second payment failure if happens symoltaniasly.", () => {
    PaymentService.processPayment.mockReturnValueOnce(true);
    PaymentService.processPayment.mockReturnValueOnce(false);

    const firstAttempt = PaymentService.processPayment();
    const secondAttempt = PaymentService.processPayment();

    expect(firstAttempt).toBe(true);
    expect(secondAttempt).toBe(false);
  });
});
