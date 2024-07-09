const express = require('express');
const { Proposal, Preference, Budget } = require('../models');
const router = express.Router();

// Fetch all proposals
router.get('/proposals', async (req, res) => {
    const proposals = await Proposal.findAll({ where: { phase: 1, userId: req.user.id } });
    res.json(proposals);
});

// Add a proposal
router.post('/proposals', async (req, res) => {
    const { description, cost } = req.body;
    const proposal = await Proposal.create({ description, cost, userId: req.user.id });
    res.json(proposal);
});

// Delete a proposal
router.delete('/proposals/:id', async (req, res) => {
    const { id } = req.params;
    await Proposal.destroy({ where: { id, userId: req.user.id } });
    res.status(204).send();
});

// Fetch all proposals (Phase 2)
router.get('/all-proposals', async (req, res) => {
    const proposals = await Proposal.findAll({ where: { phase: 2 } });
    res.json(proposals);
});

// Vote on a proposal
router.post('/preferences', async (req, res) => {
    const { proposalId, score } = req.body;
    const [preference, created] = await Preference.findOrCreate({
        where: { userId: req.user.id, proposalId },
        defaults: { score }
    });
    if (!created) {
        preference.score = score;
        await preference.save();
    }
    res.json(preference);
});

// Fetch user votes
router.get('/preferences', async (req, res) => {
    const preferences = await Preference.findAll({ where: { userId: req.user.id } });
    res.json(preferences);
});

// Calculate and get results
router.get('/results', async (req, res) => {
    const budget = await Budget.findOne({ order: [['createdAt', 'DESC']] });
    const proposals = await Proposal.findAll({
        include: [
            {
                model: Preference,
                as: 'preferences',
                attributes: ['score']
            }
        ]
    });

    const scoredProposals = proposals.map(proposal => {
        const totalScore = proposal.preferences.reduce((sum, pref) => sum + pref.score, 0);
        return { ...proposal.get(), totalScore };
    });

    scoredProposals.sort((a, b) => b.totalScore - a.totalScore);

    let totalCost = 0;
    const approvedProposals = [];
    const nonApprovedProposals = [];

    for (const proposal of scoredProposals) {
        if (totalCost + proposal.cost <= budget.amount) {
            approvedProposals.push(proposal);
            totalCost += proposal.cost;
        } else {
            nonApprovedProposals.push(proposal);
        }
    }

    res.json({
        approved: approvedProposals,
        nonApproved: nonApprovedProposals
    });
});

module.exports = router;
