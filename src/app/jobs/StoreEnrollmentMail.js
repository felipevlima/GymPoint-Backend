import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class StoreEnrollmentMail {
	get key() {
		return 'StoreEnrollmentMail';
	}

	async handle({ data }) {
		const { student, plan, price, end_date } = data;

		await Mail.sendMail({
			to: `${student.name} <${student.email}>`,
			subject: 'Matricula no GymPoint realizada',
			template: 'storeEnrollment',
			context: {
				student: student.name,
				id: student.id,
				mensal: plan.price,
				plan: plan.title,
				end_date: format(parseISO(end_date), "'dia' dd 'de' MMMM 'de' yyyy", {
					locale: pt,
				}),
				price,
			},
		});
	}
}

export default new StoreEnrollmentMail();
