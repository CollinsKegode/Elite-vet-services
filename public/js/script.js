
document.addEventListener('DOMContentLoaded', function() {
    // Fixed header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Sidebar navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const pageContents = document.querySelectorAll('.page-content');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update header title
            const pageTitle = this.querySelector('.menu-text').textContent;
            document.querySelector('.header h1').innerHTML = `<i class="fas fa-${this.querySelector('i').className.split(' ')[1]}"></i> ${pageTitle}`;
            
            // Show the corresponding page content
            pageContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${section}-page`).classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });

    // Sidebar toggle functionality
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileFab = document.getElementById('mobileFab');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    }

    menuToggle.addEventListener('click', toggleSidebar);
    mobileFab.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Modal functionality
    const modals = {
        appointment: {
            btn: document.getElementById('addAppointmentBtn'),
            modal: document.getElementById('appointmentModal'),
            form: document.getElementById('appointmentForm')
        },
        payment: {
            btn: document.getElementById('addPaymentBtn'),
            modal: document.getElementById('paymentModal'),
            form: document.getElementById('paymentForm')
        },
        debt: {
            btn: document.getElementById('addDebtBtn'),
            modal: document.getElementById('debtModal'),
            form: document.getElementById('debtForm')
        },
        todo: {
            btn: document.getElementById('addTodoBtn'),
            modal: document.getElementById('todoModal'),
            form: document.getElementById('todoForm')
        },
        todoPage: {
            btn: document.getElementById('addTodoBtnPage'),
            modal: document.getElementById('todoModal'),
            form: document.getElementById('todoForm')
        }
    };

    // Open modal handlers
    Object.values(modals).forEach(({btn, modal}) => {
        if (btn && modal) {
            btn.addEventListener('click', () => {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            });
        }
    });

    // Close modal handlers (both X button and Cancel button)
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    });

    // Close modal when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                setTimeout(() => {
                    this.style.display = 'none';
                }, 300);
            }
        });
    });

    // Form submission handlers
    if (modals.appointment.form) {
        modals.appointment.form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Appointment added successfully!');
            this.reset();
            modals.appointment.modal.classList.remove('show');
            setTimeout(() => {
                modals.appointment.modal.style.display = 'none';
            }, 300);
        });
    }

    if (modals.payment.form) {
        modals.payment.form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Payment recorded successfully!');
            this.reset();
            modals.payment.modal.classList.remove('show');
            setTimeout(() => {
                modals.payment.modal.style.display = 'none';
            }, 300);
        });
    }

    if (modals.debt.form) {
        modals.debt.form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Debt added successfully!');
            this.reset();
            modals.debt.modal.classList.remove('show');
            setTimeout(() => {
                modals.debt.modal.style.display = 'none';
            }, 300);
        });
    }

    if (modals.todo.form) {
        modals.todo.form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="text"]');
            const dateInput = this.querySelector('input[type="date"]');
            
            // Create new todo item
            const todoList = document.getElementById('todoList') || document.getElementById('todoListPage');
            const newItem = document.createElement('li');
            newItem.className = 'todo-item';
            newItem.innerHTML = `
                <input type="checkbox" class="todo-check">
                <span class="todo-text">${input.value}</span>
                <span class="todo-date">${dateInput.value ? new Date(dateInput.value).toLocaleDateString() : 'No date'}</span>
                <button class="btn btn-primary btn-sm"><i class="fas fa-trash"></i></button>
            `;
            
            // Add event listeners to new item
            const checkbox = newItem.querySelector('.todo-check');
            const text = newItem.querySelector('.todo-text');
            const deleteBtn = newItem.querySelector('button');
            
            checkbox.addEventListener('change', function() {
                text.classList.toggle('completed', this.checked);
            });
            
            deleteBtn.addEventListener('click', function() {
                newItem.remove();
            });
            
            todoList.appendChild(newItem);
            this.reset();
            modals.todo.modal.classList.remove('show');
            setTimeout(() => {
                modals.todo.modal.style.display = 'none';
            }, 300);
        });
    }

    // Todo list functionality
    document.querySelectorAll('.todo-check').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const text = this.nextElementSibling;
            text.classList.toggle('completed', this.checked);
        });
    });

    document.querySelectorAll('.todo-item button').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.todo-item').remove();
        });
    });

    // Responsive adjustments
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileFab.style.display = 'flex';
        } else {
            mobileFab.style.display = 'none';
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});
