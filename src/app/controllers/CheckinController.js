import { Op } from 'sequelize';
import moment from 'moment';

import Enrollment from '../models/Enrollment';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
	async store(req, res) {
		const { studentId } = req.params;

		const student = await Student.findByPk(studentId);

		if (!student) {
			return res.status(400).json({ error: 'Student does not exist' });
		}

		const enrollment = await Enrollment.findOne({
			where: { student_id: studentId },
		});

		if (!enrollment) {
			return res
				.status(400)
				.json({ error: 'Student does not have an enrollment.' });
		}

		const checkDate = await Checkin.findAll({
			where: {
				student_id: studentId,
				createdAt: {
					[Op.gte]: moment()
						.subtract(7, 'days')
						.toDate(),
				},
			},
		});

		if (checkDate.length >= 5) {
			return res
				.status(401)
				.json({ error: 'Only 5 checkins allowed within 7 days', checkDate });
		}

		const checkin = await Checkin.create({
			student_id: studentId,
		});

		return res.json(checkin);
	}

	async index(req, res) {
		const { studentId } = req.params;

		const student = await Student.findByPk(studentId);

		if (!student) {
			return res.status(400).json({ error: 'Student does not exist' });
		}

		const enrollment = await Enrollment.findOne({
			where: { student_id: studentId },
		});

		if (!enrollment) {
			return res
				.status(400)
				.json({ error: 'Student does not have an enrollment.' });
		}

		const checkins = await Checkin.findAll({
			where: {
				student_id: studentId,
				createdAt: {
					[Op.gte]: moment()
						.subtract(7, 'days')
						.toDate(),
				},
			},
			order: [['id', 'DESC']],
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['name'],
				},
			],
		});

		return res.json(checkins);
	}
}

export default new CheckinController();
