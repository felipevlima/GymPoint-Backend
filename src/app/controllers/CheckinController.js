import { subDays, startOfDay, endOfDay, isAfter } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

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

		if (isAfter(new Date(), enrollment.end_date)) {
			return res.status(400).json({ error: 'Enrollment end_date is past' });
		}

		const countCheckinExists = await Checkin.count({
			where: {
				student_id: studentId,
				createdAt: {
					[Op.between]: [
						startOfDay(subDays(new Date(), 7)),
						endOfDay(new Date()),
					],
				},
			},
		});

		if (countCheckinExists === 5) {
			return res.status(400).json({ error: 'Already have 5 checkin' });
		}

		const { id, student_id, createdAt } = await Checkin.create({
			student_id: studentId,
		});

		return res.json({ id, student_id, createdAt });
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
			where: { student_id: studentId },
			attributes: ['id', 'createdAt'],
		});
		return res.json(checkins);
	}
}

export default new CheckinController();
