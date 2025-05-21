import Column from "./Column.js";

export default class Kanban{
    constructor(root){
        this.root = root;
        Kanban.columns().forEach(column => {
            const columnUi= new Column( column.id, column.title)
            
            this.root.appendChild(columnUi.elements.root);
        
        });
    }
    static columns() {
        return [
            {
                id: 1,
                title: "To do"
            },
            {
                id: 2,
                title: "In Progress"
            },
            {
                id: 3,
                title: "Done"
            }
        ]
    }












































}