import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/patients', async (req, res) => {
  const [patients] = await db.query('SELECT * FROM patients');
  res.render('patients', { patients });
});

router.post('/patients', async (req, res) => {
  const { name, species, breed, age, owner_name, last_visit } = req.body;
  await db.query(
    'INSERT INTO patients (name, species, breed, age, owner_name, last_visit) VALUES (?, ?, ?, ?, ?, ?)',
    [name, species, breed, age, owner_name, last_visit]
  );
  res.redirect('/patients');
});

router.get('/appointments', async (req, res) => {
  const [appointments] = await db.query(`
    SELECT a.*, p.name as patient_name, p.owner_name 
    FROM appointments a JOIN patients p ON a.patient_id = p.id`);
  const [patients] = await db.query('SELECT id, name, owner_name FROM patients');
  res.render('appointments', { appointments, patients });
});

router.post('/appointments', async (req, res) => {
  const { patient_id, date_time, reason, status, notes } = req.body;
  await db.query(
    'INSERT INTO appointments (patient_id, date_time, reason, status, notes) VALUES (?, ?, ?, ?, ?)',
    [patient_id, date_time, reason, status, notes]
  );
  res.redirect('/appointments');
});

router.get('/payments', async (req, res) => {
  const [payments] = await db.query(`
    SELECT pay.*, p.name as patient_name, p.owner_name 
    FROM payments pay JOIN patients p ON pay.patient_id = p.id`);
  const [patients] = await db.query('SELECT id, name, owner_name FROM patients');
  res.render('payments', { payments, patients });
});

router.post('/payments', async (req, res) => {
  const { patient_id, amount, service, method, date } = req.body;
  await db.query(
    'INSERT INTO payments (patient_id, amount, service, method, date) VALUES (?, ?, ?, ?, ?)',
    [patient_id, amount, service, method, date]
  );
  res.redirect('/payments');
});

router.get('/debts', async (req, res) => {
  const [debts] = await db.query(`
    SELECT d.*, p.name as patient_name, p.owner_name 
    FROM debts d JOIN patients p ON d.patient_id = p.id`);
  const [patients] = await db.query('SELECT id, name, owner_name FROM patients');
  res.render('debts', { debts, patients });
});

router.post('/debts', async (req, res) => {
  const { patient_id, amount, reason, due_date, status, notes } = req.body;
  await db.query(
    'INSERT INTO debts (patient_id, amount, reason, due_date, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [patient_id, amount, reason, due_date, status, notes]
  );
  res.redirect('/debts');
});

router.get('/medical-records', async (req, res) => {
  const [records] = await db.query(`
    SELECT m.*, p.name as patient_name, p.owner_name 
    FROM medical_records m JOIN patients p ON m.patient_id = p.id`);
  const [patients] = await db.query('SELECT id, name, owner_name FROM patients');
  res.render('medical-records', { records, patients });
});

router.post('/medical-records', async (req, res) => {
  const { patient_id, date, diagnosis, treatment, vet_name } = req.body;
  await db.query(
    'INSERT INTO medical_records (patient_id, date, diagnosis, treatment, vet_name) VALUES (?, ?, ?, ?, ?)',
    [patient_id, date, diagnosis, treatment, vet_name]
  );
  res.redirect('/medical-records');
});

router.get('/todos', async (req, res) => {
  const [todos] = await db.query('SELECT * FROM todos');
  res.render('todos', { todos });
});

router.post('/todos', async (req, res) => {
  const { description, due_date, priority } = req.body;
  await db.query(
    'INSERT INTO todos (description, due_date, priority) VALUES (?, ?, ?)',
    [description, due_date, priority]
  );
  res.redirect('/todos');
});

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Dashboard',
        cards: [
            // Example card data - replace with your actual data
            { value: '42', title: 'Patients', type: 'patients', icon: 'fas fa-user-injured' },
            { value: '18', title: 'Appointments', type: 'appointments', icon: 'fas fa-calendar-check' },
            { value: '5', title: 'Reminders', type: 'reminders', icon: 'fas fa-bell' },
            { value: '$2,450', title: 'Revenue', type: 'revenue', icon: 'fas fa-dollar-sign' }
        ],
        appointments: [], // your existing appointments data
        payments: [],     // your existing payments data
        todos: []         // your existing todos data
    });
});

// Dashboard Route
router.get('/', (req, res) => {
  // Sample data - replace with database queries later
  const cards = [
      {
          value: 'KSh 124,750',
          title: 'Total Payments',
          type: 'payments',
          icon: 'fas fa-money-bill-wave'
      },
      {
          value: 'KSh 38,500',
          title: 'Outstanding Debts',
          type: 'debts',
          icon: 'fas fa-file-invoice-dollar'
      },
      {
          value: '142',
          title: 'Active Patients',
          type: 'patients',
          icon: 'fas fa-paw'
      },
      {
          value: '8',
          title: "Today's Appointments",
          type: 'appointments',
          icon: 'fas fa-calendar-alt'
      }
  ];

  const appointments = [
      {
          time: '09:00 AM',
          patient: 'Simba (Dog)',
          owner: 'John Mwangi',
          reason: 'Vaccination',
          status: 'Confirmed',
          statusClass: 'paid'
      },
      {
          time: '10:30 AM',
          patient: 'Whiskers (Cat)',
          owner: 'Mary Atieno',
          reason: 'Check-up',
          status: 'Confirmed',
          statusClass: 'paid'
      }
  ];

  const payments = [
      {
          date: '2023-06-15',
          patient: 'Simba (Dog)',
          owner: 'John Mwangi',
          amount: 'KSh 2,500',
          service: 'Vaccination',
          method: 'M-Pesa'
      },
      {
          date: '2023-06-14',
          patient: 'Whiskers (Cat)',
          owner: 'Mary Atieno',
          amount: 'KSh 1,800',
          service: 'Check-up',
          method: 'Cash'
      }
  ];

  const todos = [
      {
          task: 'Order more rabies vaccines',
          dueDate: 'Today',
          completed: true
      },
      {
          task: 'Call Mr. Otieno about follow-up',
          dueDate: 'Today',
          completed: false
      }
  ];

  // Render the template with all data
  res.render('index', {
      title: 'Dashboard',
      currentPage: 'dashboard',
      cards: cards,
      appointments: appointments,
      payments: payments,
      todos: todos
  });
});

export default router;
