const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Do task 1'},
        'task-2': { id: 'task-2', content: 'Do task 2'},
        'task-3': { id: 'task-3', content: 'Do task 3'},
        'task-4': { id: 'task-4', content: 'Do task 4'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'State 1',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'State 2',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'State 3',
            taskIds: []
        },
        'column-4': {
            id: 'column-4',
            title: 'State 4',
            taskIds: []
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3','column-4']


}

export default initialData;