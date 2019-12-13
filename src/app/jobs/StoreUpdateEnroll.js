import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class StoreUpdateEnroll {
	get key() {
		return 'StoreUpdateEnroll';
	}

	async handle({ data }) {
		const { studentData, plan, price, end_date } = data;

		await Mail.sendMail({
			to: `${studentData.name} <${studentData.email}>`,
			subject: 'Atualização no plano',
			template: 'storeUpdateEnroll',
			context: {
				student: studentData.name,
				plan: plan.title,
				mensal: plan.price,
				end_date: format(parseISO(end_date), "'dia' dd 'de' MMMM 'de' yyyy", {
					locale: pt,
				}),
				price,
			},
		});
	}
}

export default new StoreUpdateEnroll();
