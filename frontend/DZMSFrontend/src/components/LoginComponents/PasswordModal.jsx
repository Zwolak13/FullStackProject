import { useState } from 'react';

export default function PasswordModal({ onClose, isOpen }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Tutaj możesz wywołać API resetu hasła
    console.log('Reset password for:', email);
    setSubmitted(true);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50"  />

        <div className="inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full p-6 align-middle relative z-10 border-4 border-primiary-dark">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Reset password
          </h2>
          <p className='mb-3'>Provide us your email address to continue</p>

          {submitted ? (
            <p className="text-green-600">Link do resetu hasła został wysłany na Twój adres e-mail.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border bg-primary-light/60 border-white/50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 w-1/4 bg-red-500/30  font-bold rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 w-1/4 font-bold border-2 bg-secondary-dark text-white rounded hover:bg-white hover:text-secondary-dark hover:border-2"
                >
                 Send
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}