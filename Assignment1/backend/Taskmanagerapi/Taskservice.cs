using TaskManagerApi.Models;

public class TaskService
{
    private readonly List<TaskItem> _tasks = new();

    public TaskService()
    {
        // Seed with some initial tasks
        _tasks.Add(new TaskItem
        {
            Id = Guid.NewGuid(),
            Description = "Complete project documentation",
            IsCompleted = false
        });
        _tasks.Add(new TaskItem
        {
            Id = Guid.NewGuid(),
            Description = "Review pull requests",
            IsCompleted = true
        });
    }

    public List<TaskItem> GetAllTasks() => _tasks;

    public TaskItem? GetTaskById(Guid id) => _tasks.FirstOrDefault(t => t.Id == id);

    public TaskItem CreateTask(TaskItem task)
    {
        task.Id = Guid.NewGuid();
        _tasks.Add(task);
        return task;
    }

    public TaskItem? UpdateTask(Guid id, TaskItem updatedTask)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return null;

        task.Description = updatedTask.Description;
        task.IsCompleted = updatedTask.IsCompleted;
        return task;
    }

    public bool DeleteTask(Guid id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return false;

        _tasks.Remove(task);
        return true;
    }
}