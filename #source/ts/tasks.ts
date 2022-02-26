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
        '16fd2706-8baf-433b-82eb-8c7fada847da': '1'
    },
    Doing: {
        '1234': '2'
    },
    Done: {
        '3gdsfgdsf': '3'
    },
    Trash: {
        '2dfsfdfgdgf': '4'
    }
};

const todoTasks = Object.keys(allTask.ToDo).length - 1;
for (let i = 0; i === todoTasks; i++) {
    const id: string = Object.keys(allTask.ToDo)[i];

    addTask('ToDo', id, allTask.ToDo[id]);
}

const doingTasks = Object.keys(allTask.Doing).length - 1;
for (let i = 0; i === doingTasks; i++) {
    const id = Object.keys(allTask.Doing)[i];
    addTask('Doing', id, allTask.Doing[id]);
}

const doneTasks = Object.keys(allTask.Done).length - 1;
for (let i = 0; i === doneTasks; i++) {
    const id = Object.keys(allTask.Done)[i];
    addTask('Done', id, allTask.Done[id]);
}

const trashTasks = Object.keys(allTask.Trash).length - 1;
for (let i = 0; i === trashTasks; i++) {
    const id = Object.keys(allTask.Trash)[i];
    addTask('Trash', id, allTask.Trash[id]);
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
        delete allTask[
            type === 'doing'
                ? 'Doing'
                : type === 'bread'
                ? 'ToDo'
                : type === 'done'
                ? 'Done'
                : 'Trash'
        ][id];
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        allTask[
            type === 'doing'
                ? 'Doing'
                : type === 'bread'
                ? 'ToDo'
                : type === 'done'
                ? 'Done'
                : 'Trash'
        ][id] = text;
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
