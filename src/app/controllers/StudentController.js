import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Enrrolment from '../models/Enrollment';

class StudentController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			age: Yup.number().required(),
			weight: Yup.number().required(),
			height: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const studentExists = await Student.findOne({
			where: { email: req.body.email },
		});

		if (studentExists) {
			return res.status(400).json({ error: 'Student already exists' });
		}

		const { name, email, age, weight, height } = req.body;

		const { id } = await Student.create({ name, email, age, weight, height });

		return res.json({
			id,
			name,
			email,
			age,
			weight,
			height,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			age: Yup.number(),
			weight: Yup.number(),
			height: Yup.number(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { name, email, age, weight, height } = req.body;
		const { id } = req.params;

		const student = await Student.findByPk(id);

		if (!student) {
			return res.status(400).json({ erro: 'Student does not exist' });
		}

		if (email && email !== student.email) {
			const studentExists = await Student.findOne({ where: { email } });

			if (studentExists) {
				return res.status(400).json({ error: 'Student already exists' });
			}
		}

		const updatedStudent = await student.update({
			name,
			email,
			age,
			weight,
			height,
		});

		return res.json({
			id,
			name: updatedStudent.name,
			email: updatedStudent.email,
			age: updatedStudent.age,
			weight: updatedStudent.weight,
			height: updatedStudent.height,
		});
	}

	async index(req, res) {
		const { q } = req.query;
		const where = {};

		if (q) {
			where.name = {
				[Op.like]: `%${q}%`,
			};
		}

		const students = await Student.findAll({
			where: where || null,
		});

		students.sort((a, b) => a.name.localeCompare(b.name));

		return res.json(students);
	}

	async find(req, res) {
		const { id } = req.params;

		const student = await Student.findByPk(id);

		res.json(student);
	}

	async delete(req, res) {
		const { id } = req.params;

		const studentExists = await Student.findByPk(id);

		if (!studentExists) {
			return res.status(400).json({ erro: 'Student does not exist' });
		}

		const studentEnrrolment = await Enrrolment.findOne({
			where: { student_id: id },
			attributes: ['id', 'active'],
		});

		if (studentEnrrolment && studentEnrrolment.active) {
			return res.status(400).json({ erro: 'Student has a active Enrrolment' });
		}

		await studentExists.destroy();
		return res.json();
	}
}

export default new StudentController();
