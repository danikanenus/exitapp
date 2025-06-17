import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { Exam } from '../../types';

interface PaymentScreenProps {
  exam: Exam;
  onBack: () => void;
  onComplete: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ exam, onBack, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('card');

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Exam:</span>
            <span className="font-medium text-gray-900">{exam.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Questions:</span>
            <span className="text-gray-900">{exam.questions.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Access:</span>
            <span className="text-gray-900">Lifetime</span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="font-bold text-xl text-blue-600">{exam.price} ETB</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        
        <div className="space-y-3 mb-6">
          <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card')}
              className="w-4 h-4 text-blue-600"
            />
            <CreditCard className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Credit/Debit Card</p>
              <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="mobile"
              checked={paymentMethod === 'mobile'}
              onChange={(e) => setPaymentMethod(e.target.value as 'mobile')}
              className="w-4 h-4 text-blue-600"
            />
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Mobile Money</p>
              <p className="text-sm text-gray-500">M-Pesa, Telebirr, HelloCash</p>
            </div>
          </label>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'mobile' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+251 9XX XXX XXX"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                You will receive a payment request on your phone to complete the transaction.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Pay {exam.price} ETB</span>
            </div>
          )}
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600">
          By completing your purchase, you agree to our Terms of Service and Privacy Policy.
          You will have lifetime access to this exam.
        </p>
      </div>
    </div>
  );
};