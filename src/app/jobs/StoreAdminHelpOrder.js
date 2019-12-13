import Mail from '../../lib/Mail';

class StoreAdminHelpOrder {
	get key() {
		return 'StoreAdminHelpOrder';
	}

	async handle({ data }) {
		const { student, question, answer } = data;

		await Mail.sendMail({
			to: `${student.name} <${student.email}>`,
			subject: 'Resposta do GymPoint recebida',
			template: 'storeAdminHelpOrder',
			context: {
				student: student.name,
				question,
				answer,
			},
		});
	}
}

export default new StoreAdminHelpOrder();
