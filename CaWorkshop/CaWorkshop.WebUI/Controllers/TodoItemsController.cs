using CaWorkshop.Application.TodoItems.Commands.CreateTodoItem;
using CaWorkshop.Application.TodoItems.Commands.DeleteTodoItem;
using CaWorkshop.Application.TodoItems.Commands.UpdateTodoItem;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace CaWorkshop.WebUI.Controllers
{
    [Authorize]
    public class TodoItemsController : ApiControllerBase
    { 
        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<long>> PostTodoItem(
            CreateTodoItemCommand command)
        {
            return await Sender.Send(command);
        }

        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> PutTodoItem(long id,
            UpdateTodoItemCommand command)
        {
            if (id != command.Id) return BadRequest();

            await Sender.Send(command);

            return NoContent();
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            await Sender.Send(new DeleteTodoItemCommand { Id = id });

            return NoContent();
        }
    }
}
