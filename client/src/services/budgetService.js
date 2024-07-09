import api from './api';

export const setBudget = (budget) => api.post('/budget', { budget });
export const getProposals = () => api.get('/proposals');
export const addProposal = (proposal) => api.post('/proposals', proposal);
export const updateProposal = (id, proposal) => api.put(`/proposals/${id}`, proposal);
export const deleteProposal = (id) => api.delete(`/proposals/${id}`);
export const voteProposal = (vote) => api.post('/preferences', vote);
export const getVotes = () => api.get('/preferences');
