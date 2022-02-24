"use strict";
const inputEnter = document.querySelector('#addTaskInput');
inputEnter.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        if (inputEnter.value.length == 0) {
            alert('Please Enter a Task');
        }
        else {
            const id = Math.floor(Math.random() * 10000);
            addTask('ToDo', String(id), inputEnter.value);
            inputEnter.value = '';
        }
    }
});
const containers = document.querySelectorAll('.container');
document.getElementById('delete').onclick = function () {
    document.querySelector('.deleteAll').innerHTML = '';
};
containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        }
        else {
            container.insertBefore(draggable, afterElement);
        }
    });
});
function getDragAfterElement(container, y) {
    const draggableElements = [
        ...container.querySelectorAll('.draggable:not(.dragging)')
    ];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        }
        else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
const allTask = {
    ToDo: {
        '16fd2706-8baf-433b-82eb-8c7fada847da': 'sdfsdf'
    },
    Doing: {
        '1234': 'sdfsdf'
    },
    Done: {
        '3gdsfgdsf': 'sdfsdf'
    },
    Trash: {
        '2dfsfdfgdgf': 'sdfsdf'
    }
};
const todoTasks = Object.keys(allTask.ToDo).length - 1;
for (let i = 0; i === todoTasks; i++) {
    const id = Object.keys(allTask.ToDo)[i];
    addTask('ToDo', id, allTask.ToDo[id]);
}
const doingTasks = Object.keys(allTask.Doing).length - 1;
for (let i = 0; i === doingTasks; i++) {
    const id = Object.keys(allTask.ToDo)[i];
    addTask('Doing', id, allTask.ToDo[id]);
}
const doneTasks = Object.keys(allTask.Done).length - 1;
for (let i = 0; i === doneTasks; i++) {
    const id = Object.keys(allTask.ToDo)[i];
    addTask('Done', id, allTask.ToDo[id]);
}
const trashTasks = Object.keys(allTask.Trash).length - 1;
for (let i = 0; i === trashTasks; i++) {
    const id = Object.keys(allTask.ToDo)[i];
    addTask('Trash', id, allTask.ToDo[id]);
}
function addTask(type, id, text) {
    const task = document.createElement('div');
    const inputTask = document.createElement('input');
    const labelTask = document.createElement('label');
    task.classList.add('task');
    task.draggable = true;
    task.id = 'draggable';
    inputTask.id = String(id);
    inputTask.type = 'checkbox';
    labelTask.htmlFor = String(id);
    labelTask.innerHTML = text;
    task.appendChild(inputTask);
    task.appendChild(labelTask);
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging');
    });
    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
    });
    if (type === 'ToDo') {
        document.querySelector('.bread').appendChild(task);
    }
    else if (type === 'Doing') {
        document.querySelector('.doing').appendChild(task);
    }
    else if (type === 'Done') {
        document.querySelector('.done').appendChild(task);
    }
    else if (type === 'Trash') {
        document.querySelector('.deleteAll').appendChild(task);
    }
    else {
        return;
    }
}
//# sourceMappingURL=index.js.map