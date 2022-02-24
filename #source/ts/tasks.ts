interface allTask {
    ToDo: {
        [key: string]: string;
    };
    Doing: {
        [key: string]: string;
    };
    Done: {
        [key: string]: string;
    };
    Trash: {
        [key: string]: string;
    };
}

const allTask: allTask = {
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
    const id: string = Object.keys(allTask.ToDo)[i];

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

function addTask(type: string, id: string, text: string) {
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
        (document.querySelector('.bread') as HTMLElement).appendChild(task);
    } else if (type === 'Doing') {
        (document.querySelector('.doing') as HTMLElement).appendChild(task);
    } else if (type === 'Done') {
        (document.querySelector('.done') as HTMLElement).appendChild(task);
    } else if (type === 'Trash') {
        (document.querySelector('.deleteAll') as HTMLElement).appendChild(task);
    } else {
        return;
    }
}
