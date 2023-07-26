

export const createTableList = (data) => {
    
    return data
        .map(
            ({ id, name, createdAt, category, content, dates, archived }) => {
                if (!archived) {
                    return `<tr class="main-table__line" data-rowid="${id}">
                            <td>${name}</td>
                            <td>${createdAt}</td>
                            <td>${category}</td>
                            <td>${content}</td>
                            <td>${dates}</td>
                            <td>                                
                                <svg class="icon main-table__line-icon redact" data-id="${id}" width="18" height="18">
                                    <use class="redact" data-id="${id}" href="./images/icons.svg#icon-pencil"></use>
                                </svg>
                                
                                <svg class="icon main-table__line-icon archieve" data-id="${id}" width="18" height="18">
                                    <use class="archieve" data-id="${id}" href="./images/icons.svg#icon-box-add"></use>
                                </svg>
                            
                                <svg class="icon main-table__line-icon delete" data-id="${id}" width="18" height="18">
                                    <use class="delete" data-id="${id}" href="./images/icons.svg#icon-bin2"></use>
                                </svg>                                
                            </td>
                        </tr>`;
                }
            }
        )
        .join('');
};

export const createArchivedList = (data) => {
    
    return data
        .map(
            ({ id, name, category, archived }) => {
                if (archived) {
                    return `<tr class="archived-table__line" data-rowid="${id}">
                        <td>${category}</td>
                        <td>${name}</td>
                        <td><button class="button" type="button" data-id="${id}">Return to list</button></td>
                    </tr>`;
                }
            }
        )
        .join('');
};

export const createStatusList = (data) => {    
    const list = [
        {
            name: "Task",
            active: 0,
            archived: 0
        },
        {
            name: "Random Thought",
            active: 0,
            archived: 0
        },
        {
            name: "Idea",
            active: 0,
            archived: 0
        },
        {
            name: "Quote",
            active: 0,
            archived: 0
        },
    ];
    
    data.forEach(({ category, archived }) => {
        const i = list.findIndex(({ name }) => name === category);
        archived ? list[i].archived += 1 : list[i].active += 1;
     });
        
    return list
        .map(
            (item) => {                
                return `<tr class="archived-table__line">
                    <td>${item.name}</td>
                    <td>${item.active}</td>
                    <td>${item.archived}</td>
                </tr>`;                
            }
        )
        .join('');
};

