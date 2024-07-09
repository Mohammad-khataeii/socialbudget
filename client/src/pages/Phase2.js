import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Phase2 = () => {
    const [proposals, setProposals] = useState([]);
    const [votes, setVotes] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProposals = async () => {
            const response = await api.get('/proposals');
            setProposals(response.data);
        };
        const fetchVotes = async () => {
            const response = await api.get('/preferences');
            const votes = response.data.reduce((acc, vote) => {
                acc[vote.proposalId] = vote.score;
                return acc;
            }, {});
            setVotes(votes);
        };
        fetchProposals();
        fetchVotes();
    }, []);

    const handleVote = async (proposalId, score) => {
        await api.post('/preferences', { proposalId, score });
        setVotes({ ...votes, [proposalId]: score });
    };

    return (
        <div>
            <h2>Vote on Proposals</h2>
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        {proposal.description} - {proposal.cost}€
                        {proposal.userId !== user.id && (
                            <div>
                                <label>Score: </label>
                                <input type="number" min="1" max="3" value={votes[proposal.id] || 0}
                                    onChange={(e) => handleVote(proposal.id, parseInt(e.target.value))} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Phase2;
