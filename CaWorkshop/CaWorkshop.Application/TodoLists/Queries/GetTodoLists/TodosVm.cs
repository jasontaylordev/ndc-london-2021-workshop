using System.Collections.Generic;

namespace CaWorkshop.Application.TodoLists.Queries.GetTodoLists
{
    public class TodosVm
    {
        public List<LookupDto> PriorityLevels { get; set; }

        public List<TodoListDto> Lists { get; set; }
    }
}