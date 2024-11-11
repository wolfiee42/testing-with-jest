const PaymentService = {
  processPayment: jest.fn(),
};

describe("Payment Service Test", () => {
  it("should return first payment successfull and the second payment failure if happens simultaneously.", () => {
    PaymentService.processPayment.mockReturnValueOnce(true);
    PaymentService.processPayment.mockReturnValueOnce(false);

    const firstAttempt = PaymentService.processPayment();
    const secondAttempt = PaymentService.processPayment();

    expect(firstAttempt).toBe(true);
    expect(secondAttempt).toBe(false);
  });
});
