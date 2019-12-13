module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'plans',
			[
				{
					title: 'Diamond',
					duration: 6,
					price: 89,
					total_price: 535,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: () => {},
};
