<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  API: GymPoint
</h3>

<p align="center">API Version: 1.0.0-alpha</p>

### :computer: Functionalidades

* Node.js + Express
* JWT Authentication using jsonwebtoken
* Schema validation using Yup
* Password encryption using bcrypt
* Background jobs using queues - be-queue
* Server side mails using nodemailer
* Email templates using handlebars
* Use https://mailtrap.io to send emails on Development environment
* Use Sentry as bug tracker/monitoring
* Custom error handler middleware with styled errors using Youch
* .env variables using dotenv 

### :minidisc: Databases
* Postgres (sequelize) for Authentication
* Redis for background processing - controll job queues
* MongoDB (mongoose) for Notifications


### :calling: Features
* Use eslint/prettier last version to integrate with VSCode (fix issue with Eslint 6+ and Prettier)
* Use Sucrase [https://github.com/alangpierce/sucrase] as a super-fast alternative to Babel


### :outbox_tray: Sequelize-cli
* Create Migrations
```bash
yarn sequelize migration:create --nane=<create-users>
```
* Perform Migrations
```bash
yarn sequelize db:migrate
```
* Undo Migrations
```bash
# last migrated file
yarn sequelize db:migrate:undo
# all migrations
yarn sequelize db:migrate:undo:all
```

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

---

Make with ♥ by Felipe Vieira :wave:
