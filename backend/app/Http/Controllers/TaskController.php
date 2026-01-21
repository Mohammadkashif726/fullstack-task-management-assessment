<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // List all tasks with their project
    public function index()
    {
        return Task::with(['project', 'user'])->get();
    }

    // Show a single task with its project
    public function show(Task $task)
    {
        return $task->load(['project', 'user']);
    }

    // Create a new task
    public function create(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required|string|in:todo,doing,done',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
            'due_date' => 'nullable|date',
        ]);

        // Create the task
        $task = Task::create($validated);

        // Load relations
        $task->load(['project', 'user']);

        return response()->json([
            'message' => 'Task has been created successfully',
            'task' => $task
        ]);
    }
    public function updateStatus(Request $request, Task $task)
{
    $validated = $request->validate([
        'status' => 'required|string|in:todo,doing,done',
    ]);

    $task->update([
        'status' => $validated['status']
    ]);

    $task->load(['project', 'user']);

    return response()->json([
        'message' => 'Task status updated successfully',
        'task' => $task
    ]);
}

}
