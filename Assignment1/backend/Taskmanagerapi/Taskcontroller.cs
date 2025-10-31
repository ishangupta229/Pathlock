using Microsoft.AspNetCore.Mvc;
using TaskManagerApi.Models;

namespace TaskManagerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService)
    {
        _taskService = taskService;
    }

    // GET: api/tasks
    [HttpGet]
    public ActionResult<List<TaskItem>> GetAllTasks()
    {
        return Ok(_taskService.GetAllTasks());
    }

    // POST: api/tasks
    [HttpPost]
    public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Description))
        {
            return BadRequest("Description is required");
        }

        var createdTask = _taskService.CreateTask(task);
        return CreatedAtAction(nameof(GetAllTasks), new { id = createdTask.Id }, createdTask);
    }

    // PUT: api/tasks/{id}
    [HttpPut("{id}")]
    public ActionResult<TaskItem> UpdateTask(Guid id, [FromBody] TaskItem task)
    {
        var updatedTask = _taskService.UpdateTask(id, task);
        if (updatedTask == null)
        {
            return NotFound($"Task with ID {id} not found");
        }

        return Ok(updatedTask);
    }

    // DELETE: api/tasks/{id}
    [HttpDelete("{id}")]
    public ActionResult DeleteTask(Guid id)
    {
        var deleted = _taskService.DeleteTask(id);
        if (!deleted)
        {
            return NotFound($"Task with ID {id} not found");
        }

        return NoContent();
    }
}