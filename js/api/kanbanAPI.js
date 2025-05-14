export default class KanbanAPI {

static read(){
   const json = localStorage.getItem('kanban-data');

    if (!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ] 
    };

    return JSON.parse(json);
};

static save(data){
    localStorage.setItem('kanban-data', JSON.stringify(data));
}

static getItems(columnId) {
    const column = this.read().find(column => column.id === columnId);
    
    if (!column) {
        return [];
    }
    return column.items;
}
} 