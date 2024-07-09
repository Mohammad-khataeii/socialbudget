import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Phase3 = () => {
    const [approvedProposals, setApprovedProposals] = useState([]);
    const [nonApprovedProposals, setNonApprovedProposals] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const response = await api.get('/results');
            setApprovedProposals(response.data.approved);
            setNonApprovedProposals(response.data.nonApproved);
        };
        fetchResults();
    }, []);

    return (
        <div>
            <h2>Approved Proposals</h2>
            <ul>
                {approvedProposals.map((proposal) => (
                    <li key={proposal.id}>
                        {proposal.description} - {proposal.cost}€ - Total Score: {proposal.totalScore}
                    </li>
                ))}
            </ul>
            <h3>Non-Approved Proposals</h3>
            <ul>
                {nonApprovedProposals.map((proposal) => (
                    <li key={proposal.id}>
                        {proposal.description} - Total Score: {proposal.totalScore}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Phase3;
