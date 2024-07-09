import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Phase1 = () => {
    const [proposals, setProposals] = useState([]);
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch existing proposals by the user
        const fetchProposals = async () => {
            const response = await api.get('/proposals');
            setProposals(response.data);
        };
        fetchProposals();
    }, []);

    const handleAddProposal = async (e) => {
        e.preventDefault();
        const newProposal = { description, cost: parseFloat(cost) };
        const response = await api.post('/proposals', newProposal);
        setProposals([...proposals, response.data]);
        setDescription('');
        setCost('');
    };

    const handleDeleteProposal = async (id) => {
        await api.delete(`/proposals/${id}`);
        setProposals(proposals.filter((proposal) => proposal.id !== id));
    };

    return (
        <div>
            <h2>Submit Proposals</h2>
            <form onSubmit={handleAddProposal}>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Cost in Euro" value={cost} onChange={(e) => setCost(e.target.value)} required />
                <button type="submit" disabled={proposals.length >= 3}>Add Proposal</button>
            </form>
            <h3>Your Proposals</h3>
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        {proposal.description} - {proposal.cost}€
                        <button onClick={() => handleDeleteProposal(proposal.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Phase1;
