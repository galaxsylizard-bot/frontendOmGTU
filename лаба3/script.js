const tableBody = document.querySelector('#dataTable tbody');
const addForm = document.getElementById('addForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const errorMessage = document.getElementById('errorMessage');

function loadData() {
    const data = JSON.parse(localStorage.getItem('tableData')) || [
        { name: 'Иван Иванов', email: 'ivan@example.com', phone: '+7 (123) 456-78-90' },
        { name: 'Мария Петрова', email: 'maria@example.com', phone: '+7 (987) 654-32-10' }
    ]; 
    data.forEach(addRow);
}

function addRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td><button class="delete-btn">Удалить</button></td>
    `;
    row.querySelector('.delete-btn').addEventListener('click', () => {
        row.remove();
        saveData();
    });
    tableBody.appendChild(row);
}

function saveData() {
    const data = [];
    tableBody.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        data.push({
            name: cells[0].textContent,
            email: cells[1].textContent,
            phone: cells[2].textContent
        });
    });
    localStorage.setItem('tableData', JSON.stringify(data));
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    errorMessage.textContent = '';
    [nameInput, emailInput, phoneInput].forEach(input => input.classList.remove('error'));

    if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        errorMessage.textContent += 'Имя обязательно. ';
        isValid = false;
    }
    if (!emailInput.value.trim()) {
        emailInput.classList.add('error');
        errorMessage.textContent += 'Email обязательно. ';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        emailInput.classList.add('error');
        errorMessage.textContent += 'Некорректный email. ';
        isValid = false;
    }
    if (!phoneInput.value.trim()) {
        phoneInput.classList.add('error');
        errorMessage.textContent += 'Телефон обязательно. ';
        isValid = false;
    }

    if (isValid) {
        const newData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };
        addRow(newData);
        saveData();
        addForm.reset();
    }
});

loadData();

const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
const slideCount = slideImages.length;

function showSlide(index) {
    slides.style.transform = `translateX(${-index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    showSlide(currentIndex);
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    showSlide(currentIndex);
}, 5000);