module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'students',
			[
				{
					name: 'Felipe Vieira Lima',
					email: 'felipevieira@gmail.com',
					age: 21,
					weight: 68,
					height: 1.8,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: () => {},
};
