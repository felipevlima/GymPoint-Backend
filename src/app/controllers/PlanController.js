import * as Yup from 'yup';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

class PlanController {
	async store(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			duration: Yup.number().required(),
			price: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const planExists = await Plan.findOne({
			where: { title: req.body.title },
		});

		if (planExists) {
			return res.status(400).json({ error: 'Plan already exists' });
		}

		const { title, duration, price } = req.body;
		const totalPrice = duration * price;

		const { id } = await Plan.create({ title, duration, price, totalPrice });

		return res.json({
			id,
			title,
			duration,
			price,
			totalPrice,
		});
	}

	async index(req, res) {
		const plans = await Plan.findAll({
			attributes: ['id', 'title', 'duration', 'price', 'totalPrice'],
		});

		plans.sort((a, b) => {
			return a.duration - b.duration;
		});

		return res.json(plans);
	}

	async find(req, res) {
		const { id } = req.params;

		const plan = await Plan.findByPk(id, {
			attributes: ['id', 'title', 'duration', 'price', 'totalPrice'],
		});

		res.json(plan);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string(),
			duration: Yup.number(),
			price: Yup.number(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { planId } = req.params;

		const plan = await Plan.findByPk(planId);

		if (!plan) {
			return res.status(400).json({ error: 'Plan does not exist' });
		}

		const { title, price, duration } = req.body;
		const totalPrice = duration * price;

		if (title && title !== plan.title) {
			const planExists = await Plan.findOne({ where: { title } });

			if (planExists) {
				return res.status(400).json({ error: 'Plan already exists' });
			}
		}

		const updatedPlan = await plan.update({
			title,
			price,
			duration,
			totalPrice,
		});

		return res.json({
			id: planId,
			title: updatedPlan.title,
			duration: updatedPlan.duration,
			price: updatedPlan.price,
			totalPrice: updatedPlan.totalPrice,
		});
	}

	async delete(req, res) {
		const { planId } = req.params;

		const plan = await Plan.findByPk(planId);

		if (!plan) {
			return res.status(400).json({ error: 'Plan does not exist' });
		}

		const planEnrollment = await Enrollment.findOne({
			where: { plan_id: planId },
			attributes: ['plan_id', 'active'],
		});

		if (planEnrollment && planEnrollment.active) {
			return res
				.status(400)
				.json({ error: 'There is a Enrollmente with this plan' });
		}

		await plan.destroy();

		return res.send();
	}
}

export default new PlanController();
