import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Student from '../models/Student';

class StudentSessionController {
	async store(req, res) {
		const schema = Yup.object().shape({
			id: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}
		const { id } = req.body;

		const student = await Student.findByPk(id);

		if (!student) {
			return res.status(401).json({ error: 'Student not found' });
		}

		const { name } = student;

		return res.json({
			user: {
				id,
				name,
			},
			token: jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new StudentSessionController();
