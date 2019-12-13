module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'plans',
			[
				{
					title: 'Gold',
					duration: 3,
					price: 109,
					total_price: 327,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: () => {},
};
