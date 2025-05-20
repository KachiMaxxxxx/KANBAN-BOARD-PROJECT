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
            }
        ] 
    };

    return JSON.parse(json);
};

static save(data){
    localStorage.setItem('kanban-data', JSON.stringify(data));
}

static getItems(columnId) {
    const data = this.read();
    const column = data.find(column => column.id === columnId);
    
    if (!column) {
        return [];
    }
    
    return column.items;
}

static insertItem(columnId, content) {
    const data = this.read();
    const column = data.find(column => column.id === columnId);
    if (!column) {
        throw new Error(`Column with id ${columnId} not found`);  
    }  
    const item = {
        id: Math.floor(Math.random() * 100), content
    };

    column.items.push(item);
    this.save(data);

     return item;
}

static updateItem(itemId, newProps) {
        const data = this.read();

        let item = null;
        let currentColumn = null;

        for (const column of data) {
            const foundItem = column.items.find(item => item.id === itemId);
            if (foundItem) {
                item = foundItem;
                currentColumn = column;
                break;
            }
        }

        if (!item) {
            throw new Error(`Item with id ${itemId} not found`);
        }
        
        // Update content if provided
        item.content = newProps.content === undefined ? item.content : newProps.content;
        

        // Move item to a new column and position
        if (newProps.columnId !== undefined && newProps.position !== undefined) {
            const targetColumn = data.find(column => column.id === newProps.columnId);

            if (!targetColumn) {
                throw new Error(`Target column with id ${newProps.columnId} not found`);
            }

            // Remove from old column
            currentColumn.items = currentColumn.items.filter(item => item.id !== itemId);

            // Insert into target column at the specified position
            targetColumn.items.splice(newProps.position, 0, item);
        }
 
        this.save(data);
}

static deleteItem(itemId){
    const data = this.read();
     for (const column of data){
        const item = column.items.find(item => item.id === itemId);
        if (item) {
            column.items = column.items.filter(item => item.id !== itemId);
        }
    }
    this.save(data);
}


}


  












