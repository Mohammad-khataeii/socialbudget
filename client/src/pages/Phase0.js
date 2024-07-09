import React, { useState } from 'react';
import api from '../services/api'; // Ensure this path is correct

const Phase0 = () => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSetBudget = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await api.post('/budget', { amount });
            setSuccess('Budget set successfully!');
            console.log('Budget set successfully:', response.data);
        } catch (error) {
            setError('Setting budget failed. Please ensure you have the correct permissions.');
            console.error('Setting budget failed', error);
        }
    };

    return (
        <div className="container">
            <h2>Set Budget</h2>
            <form onSubmit={handleSetBudget}>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        className="form-control"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Set Budget</button>
            </form>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {success && <div className="alert alert-success" role="alert">{success}</div>}
        </div>
    );
};

export default Phase0;
